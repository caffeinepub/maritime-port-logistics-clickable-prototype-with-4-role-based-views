import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Migration "migration";

(with migration = Migration.run)
actor {
  // State
  var lastPortId : Nat = 0;
  var lastTugboatId : Nat = 0;

  // Persistent, globally accessible list of Ports
  // Empty at initialization, filled from HTTP outcall or by user action
  let ports : Map.Map<Nat, Port> = Map.empty<Nat, Port>();
  let tugboats = Map.empty<Nat, Tugboat>();

  /// PortGeoLocation struct
  type PortGeoLocation = {
    name : Text;
    description : Text;
    type_ : Text; // "Port", "Berth (Dry)", "Warehouse"
    latitude : Text;
    longitude : Text;
  };

  /// Port struct with associated berths
  type Port = {
    name : Text;
    country : Text;
    region : Text;
    size : Text;
    coordinates : Text; // Should be array of floats but not serializable to JS
    id : Nat; // Added port id field
    geoPoints : [PortGeoLocation];
    warehouses : [Text];
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

  // Add port and return new id
  public shared ({ caller }) func addPort(name : Text, country : Text, region : Text, size : Text, coordinates : Text, geoPoints : [PortGeoLocation], warehouses : [Text]) : async Nat {
    let port : Port = {
      id = lastPortId + 1; // Auto increment id starting from 1
      name;
      country;
      region;
      size;
      coordinates;
      geoPoints;
      warehouses;
    };

    lastPortId += 1;
    ports.add(lastPortId, port);

    lastPortId;
  };

  // Get port by id
  public query ({ caller }) func getPortById(id : Nat) : async ?Port {
    ports.get(id);
  };

  public query ({ caller }) func getAllPorts() : async [Port] {
    ports.values().toArray();
  };

  public shared ({ caller }) func addGeoPoint(portId : Nat, name : Text, description : Text, type_ : Text, latitude : Text, longitude : Text) : async () {
    switch (ports.get(portId)) {
      case (null) {};
      case (?port) {
        let geoPoint : PortGeoLocation = {
          name;
          description;
          type_;
          latitude;
          longitude;
        };

        let updatedGeoPoints = port.geoPoints.concat([geoPoint]);
        let updatedPort = {
          port with
          geoPoints = updatedGeoPoints;
        };

        ports.add(portId, updatedPort);
      };
    };
  };

  public shared ({ caller }) func addWarehouse(portId : Nat, warehouseName : Text) : async () {
    switch (ports.get(portId)) {
      case (null) {};
      case (?port) {
        let updatedWarehouses = port.warehouses.concat([warehouseName]);
        let updatedPort = {
          port with
          warehouses = updatedWarehouses;
        };

        ports.add(portId, updatedPort);
      };
    };
  };

  // Port of Tema data
  public shared ({ caller }) func addPortOfTemaData() : async () {
    let portOfTema : Port = {
      id = lastPortId + 1;
      name = "Port of Tema";
      country = "Ghana";
      region = "Greater Accra";
      size = "Large";
      coordinates = "[5.627, -0.0171]";
      geoPoints = [
        // 16 Port Berths (Dry)
        { name = "Port Berth 1"; description = "General cargo"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 2"; description = "General cargo"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 3"; description = "General cargo"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 4"; description = "General cargo"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 5"; description = "Bulk cargo"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 6"; description = "Bulk cargo"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 7"; description = "Bulk cargo"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 8"; description = "Dry docking"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 9"; description = "Dry docking"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 10"; description = "Dry docking"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 11"; description = "Dry docking"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 12"; description = "Dry docking"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 13"; description = "Dry docking"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 14"; description = "Dry docking"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 15"; description = "Dry docking"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 16"; description = "Dry docking"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        // 4 Terminal 3 Berths (Dry)
        { name = "Terminal 3 Berth 1"; description = "Container handling"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.018000000" },
        { name = "Terminal 3 Berth 2"; description = "Container handling"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.018000000" },
        { name = "Terminal 3 Berth 3"; description = "Container handling"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.018000000" },
        { name = "Terminal 3 Berth 4"; description = "Container handling"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.018000000" },
        // Individual Berths (Dry)
        { name = "Oil Jetty"; description = "Bulk liquid handling"; type_ = "Berth (Dry)"; latitude = "5.628000000"; longitude = "-0.016000000" },
        { name = "Valco Berth"; description = "Specialized cargo"; type_ = "Berth (Dry)"; latitude = "5.628500000"; longitude = "-0.015500000" },
        { name = "ABB Terminal"; description = "General cargo"; type_ = "Berth (Dry)"; latitude = "5.629000000"; longitude = "-0.017500000" },
        { name = "SBM"; description = "Mooring system"; type_ = "Berth (Dry)"; latitude = "5.630000000"; longitude = "-0.018000000" }
      ];
      warehouses = ["Warehouse 1", "Warehouse 2", "Warehouse 3"];
    };
    lastPortId += 1;
    ports.add(lastPortId, portOfTema);
  };

  // Cleanup function to remove outdated berthing data
  public shared ({ caller }) func cleanUpBerthingData() : async () {
    ports.remove(1);
  };

  // Check if Port of Tema data exists
  public query ({ caller }) func getPortOfTemaData() : async Port {
    let portOfTema : Port = {
      id = lastPortId;
      name = "Port of Tema";
      country = "Ghana";
      region = "Greater Accra";
      size = "Large";
      coordinates = "[5.627, -0.0171]";
      geoPoints = [
        // 16 Port Berths (Dry)
        { name = "Port Berth 1"; description = "General cargo"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 2"; description = "General cargo"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 3"; description = "General cargo"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 4"; description = "General cargo"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 5"; description = "Bulk cargo"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 6"; description = "Bulk cargo"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 7"; description = "Bulk cargo"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 8"; description = "Dry docking"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 9"; description = "Dry docking"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 10"; description = "Dry docking"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 11"; description = "Dry docking"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 12"; description = "Dry docking"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 13"; description = "Dry docking"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 14"; description = "Dry docking"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 15"; description = "Dry docking"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        { name = "Port Berth 16"; description = "Dry docking"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.017058333" },
        // 4 Terminal 3 Berths (Dry)
        { name = "Terminal 3 Berth 1"; description = "Container handling"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.018000000" },
        { name = "Terminal 3 Berth 2"; description = "Container handling"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.018000000" },
        { name = "Terminal 3 Berth 3"; description = "Container handling"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.018000000" },
        { name = "Terminal 3 Berth 4"; description = "Container handling"; type_ = "Berth (Dry)"; latitude = "5.627166667"; longitude = "-0.018000000" },
        // Individual Berths (Dry)
        { name = "Oil Jetty"; description = "Bulk liquid handling"; type_ = "Berth (Dry)"; latitude = "5.628000000"; longitude = "-0.016000000" },
        { name = "Valco Berth"; description = "Specialized cargo"; type_ = "Berth (Dry)"; latitude = "5.628500000"; longitude = "-0.015500000" },
        { name = "ABB Terminal"; description = "General cargo"; type_ = "Berth (Dry)"; latitude = "5.629000000"; longitude = "-0.017500000" },
        { name = "SBM"; description = "Mooring system"; type_ = "Berth (Dry)"; latitude = "5.630000000"; longitude = "-0.018000000" }
      ];
      warehouses = ["Warehouse 1", "Warehouse 2", "Warehouse 3"];
    };
    portOfTema;
  };

  // Tugboat services for Port of Tema
  public shared ({ caller }) func addTugboatsForTemaPort() : async () {
    let tugboatsData : [Tugboat] = [
      // Azumah Tugboat
      {
        id = lastTugboatId + 1;
        name = "Azumah";
        engine_power_hp = 4000;
        bollard_pull_ton = 45;
        length_m = 28;
        year_built = 2008;
        flag = "Ghana";
        port = "Port of Tema";
      },
      // Ayele Tugboat
      {
        id = lastTugboatId + 2;
        name = "Ayele";
        engine_power_hp = 3600;
        bollard_pull_ton = 40;
        length_m = 27;
        year_built = 2005;
        flag = "Ghana";
        port = "Port of Tema";
      },
      // Nyankopon Tugboat
      {
        id = lastTugboatId + 3;
        name = "Nyankopon";
        engine_power_hp = 4200;
        bollard_pull_ton = 46;
        length_m = 29;
        year_built = 2010;
        flag = "Ghana";
        port = "Port of Tema";
      },
      // Mary Tugboat
      {
        id = lastTugboatId + 4;
        name = "Mary";
        engine_power_hp = 3800;
        bollard_pull_ton = 42;
        length_m = 28;
        year_built = 2007;
        flag = "Ghana";
        port = "Port of Tema";
      },
      // Theresa Tugboat
      {
        id = lastTugboatId + 5;
        name = "Theresa";
        engine_power_hp = 3700;
        bollard_pull_ton = 41;
        length_m = 27;
        year_built = 2006;
        flag = "Ghana";
        port = "Port of Tema";
      },
      // Propont Tugboat
      {
        id = lastTugboatId + 6;
        name = "Propont";
        engine_power_hp = 4100;
        bollard_pull_ton = 44;
        length_m = 29;
        year_built = 2009;
        flag = "Ghana";
        port = "Port of Tema";
      }
    ];

    for (tugboat in tugboatsData.values()) {
      tugboats.add(tugboat.id, tugboat);
      lastTugboatId := tugboat.id;
    };
  };

  public query ({ caller }) func getAllTugboats() : async [Tugboat] {
    tugboats.values().toArray();
  };

  public query ({ caller }) func getTugboatsByPort(portName : Text) : async [Tugboat] {
    tugboats.values().toArray().filter(func(tb) { tb.port == portName });
  };

  public query ({ caller }) func getTugboatById(id : Nat) : async ?Tugboat {
    tugboats.get(id);
  };
};
