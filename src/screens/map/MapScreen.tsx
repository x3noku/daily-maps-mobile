import React, { ReactElement, useEffect, useState } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';
import Config from 'react-native-config';
import RNLocation, { Location } from 'react-native-location';
import { feature as createFeature, Feature } from '@turf/helpers';
import { View } from 'react-native';
import Button, { ButtonType } from '../../components/atoms/Button';
import { COLOR_BLUE_PRIMARY, COLOR_WHITE } from '../../styles/colors';
import { Screens } from '../../utils/constants';
import IconButton, { IconButtonType } from '../../components/atoms/IconButton';
import { useSocketConnection } from '../../context/SocketSonnectionContext';
import IList from '../../models/List';
import { useIsFocused } from '@react-navigation/native';
import { lineString } from '@turf/helpers';

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
    const [pointsCollection, setPointsCollection] = useState<Array<ReactElement>>();

    const socketConnection = useSocketConnection();
    const isFocused = useIsFocused();

    useEffect(() => {
        handlePermission();
    }, []);

    useEffect(() => {
        if (socketConnection && isFocused) {
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
    }, [isFocused]);

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
                const point = (<MapboxGL.PointAnnotation
                    key={'waypoint' + index}
                    id={'waypoint' + index}
                    coordinate={waypoint}
                />);
                points.push(point);
            });
            setPointsCollection(points);
            buildRouteLeg(waypoints, 0);
        }
        else {
            setPointsCollection([]);
            setRouteGeometry({ coordinates: [], type: 'LineString' });
        }
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
    
    
                {pointsCollection}
                
                <MapboxGL.ShapeSource id='routeSource' shape={routeGeometry}>
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

const one_two = {
    coordinates: [
        [73.440927, 54.942743],
        [73.440694, 54.942836],
        [73.440814, 54.942935],
        [73.444377, 54.941501],
        [73.444575, 54.941667],
    ],
    type: 'LineString',
};
const two_three = {
    coordinates: [
        [73.444575, 54.941667],
        [73.444377, 54.941501],
        [73.442407, 54.942302],
        [73.442552, 54.942424],
    ],
    type: 'LineString',
};
const three_four = {
    coordinates: [
        [73.442552, 54.942424],
        [73.442407, 54.942302],
        [73.444377, 54.941501],
        [73.445439, 54.941978],
        [73.445878, 54.941106],
        [73.441851, 54.937669],
        [73.434031, 54.934501],
        [73.450417, 54.92197],
        [73.44497, 54.918134],
        [73.438448, 54.921034],
        [73.437984, 54.920646],
    ],
    type: 'LineString',
};
