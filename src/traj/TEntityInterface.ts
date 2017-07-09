export interface TEntityInterface{
        _id?: string;
      _name: string;
      _position?;
      _orientation?;
      _hpr?;
      _modelUrl:string;
      _para?: object;
      _CEntity?: string;  // Cesium Entity
      _Controller:object;
} 