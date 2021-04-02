export default interface ILocation {
    type: LocationType;
    
    coordinates: Array<number>;
};

export enum LocationType {
    point = 'Point'
}
