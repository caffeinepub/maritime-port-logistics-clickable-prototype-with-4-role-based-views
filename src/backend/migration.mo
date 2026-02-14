import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type PortGeoLocation = {
    name : Text;
    description : Text;
    type_ : Text;
    latitude : Text;
    longitude : Text;
  };

  type Port = {
    name : Text;
    country : Text;
    region : Text;
    size : Text;
    coordinates : Text;
    id : Nat;
    geoPoints : [PortGeoLocation];
    warehouses : [Text];
  };

  type OldActor = {
    ports : Map.Map<Nat, Port>;
    lastPortId : Nat;
  };

  type Tugboat = {
    id : Nat;
    name : Text;
    engine_power_hp : Nat;
    bollard_pull_ton : Nat;
    length_m : Nat;
    year_built : Nat;
    flag : Text;
    port : Text;
  };

  type NewActor = {
    ports : Map.Map<Nat, Port>;
    tugboats : Map.Map<Nat, Tugboat>;
    lastPortId : Nat;
    lastTugboatId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    {
      ports = old.ports;
      tugboats = Map.empty<Nat, Tugboat>();
      lastPortId = old.lastPortId;
      lastTugboatId = 0;
    };
  };
};
