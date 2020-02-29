//
//  MapVC.swift
//  ParkInn
//
//  Created by Kyle Aquino on 2/28/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit
import MapKit
import CoreLocation

class MapVC: UIViewController {

    @IBOutlet weak var mapView: MKMapView!

    let locationManager = CLLocationManager()

    // Controls the zoom of the mapview
    private let regionZoom: Double = 1000

    override func viewDidLoad() {
        super.viewDidLoad()

        setupMenu()
        setupMapView()
        verifyLocationService()

        // FOR DEBUGGING ONLY
        #if DEBUG

        // In production these will be created from the GET request to the server
        let southpoint = LotAnnotation(title: "South Point", coordinate: CLLocationCoordinate2D(latitude: 36.012926, longitude: -115.175648), info: "South Point Casino Parking Garage")

        let mResort = LotAnnotation(title: "M Resort", coordinate: CLLocationCoordinate2D(latitude: 35.964762, longitude: -115.166790), info: "M Resort Parking Garage")

        mapView.addAnnotations([southpoint, mResort])
        #endif
    }

    private func setupMapView() {
        // Add any configuration changes to the map view

        // Register the custom annotation
        mapView.register(LotMarkerView.self, forAnnotationViewWithReuseIdentifier: MKMapViewDefaultAnnotationViewReuseIdentifier)
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

    @IBAction func locationButtonPressed(_ sender: Any) {
        centerMapOnUser()
    }
}

// MARK: - CLLocationManagerDelegate
// This controls the delegation for user location
extension MapVC: CLLocationManagerDelegate {

    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        // Check if there are any valid locations
        guard let location = locations.last else { return }
        let center = CLLocationCoordinate2D(latitude: location.coordinate.latitude, longitude: location.coordinate.longitude)
        centerMap(at: center)
    }

    func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
        // Check the authorizations again
        verifyLocationAuthorization()
    }

    private func centerMapOnUser() {
        if let location = locationManager.location?.coordinate {
            centerMap(at: location)
        }
    }

    private func centerMap(at center: CLLocationCoordinate2D) {
        let region = MKCoordinateRegion(center: center, latitudinalMeters: regionZoom, longitudinalMeters: regionZoom)
        mapView.setRegion(region, animated: true)
    }

    private func verifyLocationService() {
        if CLLocationManager.locationServicesEnabled() {
            // Setup Location Manager
            setupLocationManager()
            verifyLocationAuthorization()
        } else {
            // Display Alert for no location
        }
    }

    private func setupLocationManager() {
        locationManager.delegate = self
        locationManager.desiredAccuracy = .greatestFiniteMagnitude

    }

    private func verifyLocationAuthorization() {
        switch CLLocationManager.authorizationStatus() {
            case .notDetermined:
                // Ask for permission
                locationManager.requestWhenInUseAuthorization()
                break
            case .restricted:
                // Display that their permissions are restricted
                break
            case .denied:
                // Display alert notifying that location services are disabled
                break
            case .authorizedAlways, .authorizedWhenInUse:
                // Location services available - Begin Updating Location
                locationManager.startUpdatingLocation()

                // Center the map on the user
                centerMapOnUser()
                break
            @unknown default:
            fatalError("Verify Location returned with an unknown type")
        }
    }
}

// MARK: - MKMapViewDelegate

extension MapVC: MKMapViewDelegate {

    func mapView(_ mapView: MKMapView, annotationView view: MKAnnotationView, calloutAccessoryControlTapped control: UIControl) {
        // Make sure that we are dealing with a LotAnnotation object
        guard let lotAnnotation = view.annotation as? LotAnnotation else { return }

        let lotName = lotAnnotation.title
        let lotDesc = lotAnnotation.info

        // For now, testing with alert controller. To be replaced with displaying a Lot page
        let ac = UIAlertController(title: lotName, message: lotDesc, preferredStyle: .alert)
        ac.addAction(UIAlertAction(title: "OK", style: .default))
        present(ac, animated: true)
    }

    func mapView(_ mapView: MKMapView, didSelect view: MKAnnotationView) {
        // Center the map on the selected annotation
        if let location = view.annotation?.coordinate {
            self.centerMap(at: location)
        }
    }
}

// MARK: - SWRevealViewControllerDelegate

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
