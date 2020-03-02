//
//  LotAnnotation.swift
//  ParkInn
//
//  Created by Kyle Aquino on 2/28/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit
import MapKit

class LotAnnotation: NSObject, MKAnnotation {
    var title: String?
    var coordinate: CLLocationCoordinate2D
    var lot: Lot

    init(lot: Lot) {
        self.lot = lot
        self.title = "Lot \(lot.lotID)" // This should be replaced with a Lot name if one is added later
        self.coordinate = CLLocationCoordinate2D(latitude: lot.location.latitude, longitude: lot.location.longitude)
    }
}
