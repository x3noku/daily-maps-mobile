import React, { useEffect, useState } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Config from 'react-native-config';
import RNLocation, { Location } from 'react-native-location';
import { feature as createFeature, Feature, Geometry } from '@turf/helpers';

MapboxGL.setAccessToken(Config.MAPBOX_ACCESS_TOKEN);
RNLocation.configure({
    distanceFilter: undefined,
});

const MapScreen = () => {
    const [location, setLocation] = useState<Location | null>(null);
    const [feature, setFeature] = useState<Feature | undefined>(undefined);

    useEffect(() => {
        handlePermission();
    }, []);

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
    const handleClick = (event: GeoJSON.Feature) => {
        setFeature(createFeature(event.geometry));
        console.log(event.geometry);
    };

    return (
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
                animationDuration={0}
            />
            <MapboxGL.UserLocation />
            {feature && <MapboxGL.PointAnnotation id='myMarker' coordinate={feature?.geometry.coordinates} />}
        </MapboxGL.MapView>
    );
};

export default MapScreen;
