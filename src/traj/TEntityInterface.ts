export interface TEntityInterface{
        _id?: String;
      _name: String;
      _position?;
      _orientation?;
      _hpr?;
      _modelUrl: String;
      _para?: Object;
      _CEntity?: String;  // Cesium Entity
      _Controller:Object;
} 