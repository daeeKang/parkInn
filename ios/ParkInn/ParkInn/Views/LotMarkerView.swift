//
//  LotMarkerView.swift
//  ParkInn
//
//  Created by Kyle Aquino on 2/29/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import MapKit

class LotMarkerView: MKMarkerAnnotationView {
    override var annotation: MKAnnotation? {
        willSet {
            // This code will allow us to access the Lot model class once retrieved from server
            // guard let lot = newValue as? Lot else { return }
            canShowCallout = true
            rightCalloutAccessoryView = UIButton(type: .detailDisclosure)
            markerTintColor = .red // This should be based on the 'fullness' of the lot
            glyphText = "P"
            displayPriority = .required
        }
    }
}
