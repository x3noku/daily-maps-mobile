import React, { ReactElement, useEffect, useState } from "react";
import MapboxGL from "@react-native-mapbox-gl/maps";
import MapboxDirectionsFactory from "@mapbox/mapbox-sdk/services/directions";
import Config from "react-native-config";
import RNLocation, { Location } from "react-native-location";
import { feature as createFeature, Feature, lineString } from "@turf/helpers";
import { View } from "react-native";
import Button, { ButtonType } from "../../components/atoms/Button";
import { COLOR_BLUE_PRIMARY, COLOR_BLUE_SECONDARY, COLOR_GRAY, COLOR_WHITE } from "../../styles/colors";
import { Screens } from "../../utils/constants";
import IconButton, { IconButtonType } from "../../components/atoms/IconButton";
import { useSocketConnection } from "../../context/SocketSonnectionContext";
import IList from "../../models/List";
import { useIsFocused } from "@react-navigation/native";
import IEvent, { IEventPrivacyType } from "../../models/Event";
import { LocationType } from "../../models/Location";

MapboxGL.setAccessToken(Config.MAPBOX_ACCESS_TOKEN);
RNLocation.configure({
    distanceFilter: undefined,
});

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

const directionsClient = MapboxDirectionsFactory({ accessToken: Config.MAPBOX_ACCESS_TOKEN });

const MapScreen = ({ navigation, route }: { navigation: any; route: any }) => {
    const [location, setLocation] = useState<Location | null>(null);
    const [feature, setFeature] = useState<Feature | undefined>(undefined);
    const [list, setList] = useState<IList | undefined>();
    const [routeGeometry, setRouteGeometry] = useState({ coordinates: [], type: 'LineString' });
    const [routePoints, setRoutePoints] = useState<Array<ReactElement>>();
    const [availableEvents, setAvailableEvents] = useState<Array<IEvent>>([]);
    const [availableEventsElements, setAvailableEventsElements] = useState<Array<ReactElement>>([]);

    const socketConnection = useSocketConnection();
    const isFocused = useIsFocused();

    useEffect(() => {
        handlePermission();
    }, []);

    useEffect(() => {
        if (socketConnection && isFocused) {
            /*socketConnection.eventsConnection.createEvent({
                title: 'Митап в холле ОмГУПС',
                description: 'Без маски не пропустят',
                placeName: 'ОмГУПС',
                date: {end: '2021-03-31T07:20:43Z', start: '2021-03-31T06:00:34Z'},
                location: {coordinates: [73.384744, 54.969450], type: LocationType.point},
            });
            socketConnection.eventsConnection.setCreateEventHandler(response => {
                console.log('CREATE EVENT', response);
            });*/
            socketConnection.eventsConnection.getEventsList();
            socketConnection.eventsConnection.setOnGetEventsListHandler(response => {
               if(response.success && response.response) {
                   setAvailableEvents(response.response.events);
               }
            });
            
            if (route && route.params) {
                socketConnection.tasksConnection.getListById({ id: route.params.listId });
                socketConnection.tasksConnection.setOnGetListByIdHandler(response => {
                    if (response.success && response.response) {
                        setList(response.response.list);
                    }
                });
            } else {
                setList(undefined);
            }
        }
        else if(!isFocused) {
            setList(undefined);
            setRouteGeometry({ coordinates: [], type: 'LineString' });
            setRoutePoints([]);
        }
    }, [isFocused]);

    useEffect(() => {
        showEvents();
    }, [availableEvents]);
    
    useEffect(() => {
        buildRoute();
    }, [list]);

    const handlePermission = async () => {
        const isGranted = await RNLocation.checkPermission({
            ios: 'whenInUse',
            android: {
                detail: 'fine',
            },
        });
        if (isGranted) {
            RNLocation.getLatestLocation({ timeout: 100 })
                .then(setLocation)
                .catch(() => handlePermission());
        } else {
            const isGrantedByUser = await RNLocation.requestPermission({
                ios: 'whenInUse',
                android: {
                    detail: 'fine',
                    rationale: {
                        title: 'We need to access your location',
                        message: 'We use your location to show where you are on the map',
                        buttonPositive: 'OK',
                        buttonNegative: 'Cancel',
                    },
                },
            });
            if (isGrantedByUser) {
                RNLocation.getLatestLocation({ timeout: 100 })
                    .then(setLocation)
                    .catch(() => handlePermission());
            } else {
                handlePermission();
            }
        }
    };

    const forceUpdate = useForceUpdate();
    
    const handleClick = (event: GeoJSON.Feature) => {
        setFeature(createFeature(event.geometry));
    };

    const buildRouteLeg = (waypoints: Array<Array<number>>, index: number) => {
        if (index < waypoints.length - 1) {
            const reqOptions = {
                waypoints: [
                    { coordinates: waypoints[index] },
                    { coordinates: waypoints[index+1] },
                ],
                profile: 'driving',
                geometries: 'geojson',
            };
            directionsClient
                .getDirections(reqOptions)
                .send()
                .then((response: { body: { routes: { geometry: { coordinates: import("@turf/helpers").Position[]; }; }[]; }; }) => {
                    const coordinates = lineString(response.body.routes[0].geometry.coordinates).geometry.coordinates;
                    routeGeometry.coordinates = routeGeometry.coordinates.concat(coordinates);
                    setRouteGeometry(routeGeometry);
                    buildRouteLeg(waypoints, index + 1);
                });
        }
        else {
            forceUpdate();
        }
    };

    const buildRoute = () => {
        if (list && list.tasks && list.tasks.length > 0 && location) {
            const waypoints = [
                [location.longitude, location.latitude],
                ...list.tasks?.map(task => task.location.coordinates),
            ];
            
            const points: Array<ReactElement> = [];
            waypoints.forEach((waypoint, index) => {
                const point = (
                    <MapboxGL.ShapeSource key={'waypoint' + index} id={'circleSource' + index} shape={{"coordinates": waypoint, "type": "Point"}} tolerance={0.01}>
                        <MapboxGL.CircleLayer id={'outerCircle' + index} style={{
                            circleRadius: 16,
                            circleColor: COLOR_BLUE_SECONDARY,
                            circleOpacity: 0.15,
                        }} />
                        <MapboxGL.CircleLayer id={'InnerOuterCircle' + index} style={{
                            circleRadius: 12,
                            circleColor: COLOR_BLUE_SECONDARY,
                            circleOpacity: 0.5,
                        }} />
                        <MapboxGL.CircleLayer id={'InnerCircle' + index} style={{
                            circleRadius: 10,
                            circleColor: COLOR_WHITE,
                        }} />
                        <MapboxGL.SymbolLayer id={'waypointText' + index} style={{
                            textField: index + 1 + '',
                            textSize: 12,
                        }}/>
                    </MapboxGL.ShapeSource>);
                points.push(point);
            });
            setRoutePoints(points);
            buildRouteLeg(waypoints, 0);
        }
        else {
            setRoutePoints([]);
            setRouteGeometry({ coordinates: [], type: 'LineString' });
        }
    };

    const showEvents = () => {
        const elements: Array<ReactElement> = []
        availableEvents.forEach((event, index) => {
            const point = (
                <MapboxGL.ShapeSource key={'event' + index} id={'eventCircle' + index} shape={{"coordinates": event.location.coordinates, "type": "Point"}} onPress={() => {
                    console.log(event);
                }} tolerance={0.01}>
                    <MapboxGL.CircleLayer id={'outer__OuterEventCircle' + index} style={{
                        circleRadius: 18,
                        circleColor: COLOR_BLUE_SECONDARY,
                        circleOpacity: 0.15,
                    }} />
                    <MapboxGL.CircleLayer id={'outerOuterOuterOuterOuterEventCircle' + index} style={{
                        circleRadius: 16,
                        circleColor: COLOR_BLUE_SECONDARY,
                        circleOpacity: 0.15,
                    }} />
                    <MapboxGL.CircleLayer id={'outerOuterOuterEventCircle' + index} style={{
                        circleRadius: 14,
                        circleColor: COLOR_BLUE_SECONDARY,
                        circleOpacity: 0.15,
                    }} />
                    <MapboxGL.CircleLayer id={'outerEventCircle' + index} style={{
                        circleRadius: 12,
                        circleColor: COLOR_BLUE_SECONDARY,
                        circleOpacity: 0.15,
                    }} />
                    <MapboxGL.CircleLayer id={'InnerEventCircle' + index} style={{
                        circleRadius: 10,
                        circleColor: COLOR_WHITE,
                        circleOpacity: 0.7,
                    }} />
                    <MapboxGL.SymbolLayer id={'eventText' + index} style={{
                        textField: event.title.substr(0, 1),
                        textSize: 13,
                    }}/>
                </MapboxGL.ShapeSource>);
            elements.push(point);
        });
        setAvailableEventsElements(elements);
    };
    
    return (
        <View style={{ width: '100%', height: '100%' }}>
            <MapboxGL.MapView
                style={{ height: '100%', width: '100%' }}
                styleURL={MapboxGL.StyleURL.Street}
                onPress={handleClick}
                localizeLabels={true}
            >
                <MapboxGL.Camera
                    zoomLevel={12}
                    centerCoordinate={location !== null ? [location.longitude, location.latitude] : [3.33624, 6.57901]}
                    animationMode={'flyTo'}
                    animationDuration={800}
                />
                <MapboxGL.UserLocation />
                
                {availableEventsElements}
                
                {routePoints}
                
                <MapboxGL.ShapeSource id='routeSource' shape={routeGeometry} tolerance={0.01}>
                    <MapboxGL.LineLayer
                        id='routeFill'
                        style={{
                            lineColor: COLOR_BLUE_PRIMARY,
                            lineWidth: 5.2,
                            lineCap: 'round',
                        }}
                    />
                </MapboxGL.ShapeSource>

                {feature && (
                    <MapboxGL.PointAnnotation
                        id='myMarker'
                        coordinate={feature?.geometry.coordinates}
                        onSelected={() => setFeature(undefined)}
                    />
                )}
            </MapboxGL.MapView>

            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                }}
            >
                <IconButton
                    type={[IconButtonType.Contained, IconButtonType.Default]}
                    icon={require('../../assets/images/Document.png')}
                    onPress={() => {
                        navigation.navigate(Screens.stacks.lists);
                    }}
                    containerStyles={{
                        backgroundColor: COLOR_WHITE,
                        alignSelf: 'flex-end',
                        marginEnd: 12,
                        marginBottom: 12,
                    }}
                    rippleActive
                />
                {feature !== undefined && (
                    <Button
                        type={ButtonType.Contained}
                        text='Создать задачу'
                        onPress={() =>
                            navigation.navigate(Screens.stacks.createTask, {
                                screen: Screens.createTask.primary,
                                params: {
                                    feature: feature,
                                },
                            })
                        }
                        textStyles={{
                            color: COLOR_BLUE_PRIMARY,
                        }}
                        containerStyles={{
                            backgroundColor: COLOR_WHITE,
                            alignSelf: 'center',
                        }}
                        rippleActive
                    />
                )}
                <View style={{ height: 12 }} />
            </View>
        </View>
    );
};

export default MapScreen;
