//
//  MapVC.swift
//  ParkInn
//
//  Created by Kyle Aquino on 2/28/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit
import MapKit

class MapVC: UIViewController {

    @IBOutlet weak var mapView: MKMapView!

    override func viewDidLoad() {
        super.viewDidLoad()

        setupMenu()
    }

    private func setupMenu() {
        // Add gestures for panning to open/close and tap to close
        self.view.addGestureRecognizer(self.revealViewController().panGestureRecognizer())
        self.view.addGestureRecognizer(self.revealViewController().tapGestureRecognizer())
        self.revealViewController()?.delegate = self
    }

    @IBAction func menuButtonPressed(_ sender: Any) {
        self.revealViewController()?.revealToggle(animated: true)
    }
}

extension MapVC: SWRevealViewControllerDelegate {
    func revealController(_ revealController: SWRevealViewController!, didMoveTo position: FrontViewPosition) {
        switch position {
            case .right: // Menu is Open
                mapView.isUserInteractionEnabled = false
            case .left: // Menu is Closed
                mapView.isUserInteractionEnabled = true
            default:
                mapView.isUserInteractionEnabled = true
        }
    }
}
