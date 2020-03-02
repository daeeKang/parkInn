//
//  LotVC.swift
//  ParkInn
//
//  Created by Kyle Aquino on 3/1/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit
import MapKit

class LotVC: UIViewController {

    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var descriptionLabel: UILabel!

    var lot: Lot?

    override func viewDidLoad() {
        super.viewDidLoad()

        populateView()
    }

    private func populateView() {
        if let lot = self.lot {
            nameLabel.text = "Lot \(lot.lotID)"
            descriptionLabel.text = "\(lot.availableSpots)/\(lot.availableSpots) Spots Available"
        }
    }

    @IBAction func getDirectionsPressed(_ sender: Any) {
        // Open in Maps App
        guard lot != nil else { return }
        let coordinate = CLLocationCoordinate2D(latitude: lot!.location.latitude, longitude: lot!.location.longitude)
        openMaps(for: coordinate)
    }

    private func openMaps(for coordinate: CLLocationCoordinate2D) {
        let regionDistance: CLLocationDistance = 10000
        let regionSpan = MKCoordinateRegion(center: coordinate, latitudinalMeters: regionDistance, longitudinalMeters: regionDistance)
        let options = [
            MKLaunchOptionsMapCenterKey: NSValue(mkCoordinate: regionSpan.center),
            MKLaunchOptionsMapSpanKey: NSValue(mkCoordinateSpan: regionSpan.span)
        ]
        let placemark = MKPlacemark(coordinate: coordinate, addressDictionary: nil)
        let mapItem = MKMapItem(placemark: placemark)

        mapItem.name = nameLabel.text!
        mapItem.openInMaps(launchOptions: options)
    }
}
