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
    var info: String? // Should Probably be another model class at some point

    init(title: String?, coordinate: CLLocationCoordinate2D, info: String?) {
        self.title = title
        self.coordinate = coordinate
        self.info = info
    }
}
