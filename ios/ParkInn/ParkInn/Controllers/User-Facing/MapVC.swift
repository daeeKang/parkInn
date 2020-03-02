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
import Alamofire

class MapVC: UIViewController {

    @IBOutlet weak var mapView: MKMapView!

    let locationManager = CLLocationManager()
    var lotAnnotations = [LotAnnotation]()

    // Controls the zoom of the mapview
    private let regionZoom: Double = 1000

    override func viewDidLoad() {
        super.viewDidLoad()

        setupMenu()
        setupMapView()
        verifyLocationService()

        // FOR DEBUGGING ONLY
        #if DEBUG
        // Get Lots with Company ID: "8e9fe90e-bd10-48d2-8084-8f259157c832"
        fetchLots(with: "8e9fe90e-bd10-48d2-8084-8f259157c832")
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

    private func fetchLots(with companyID: String) {
        #warning("This method needs to be reworked once the server is hosted")
        // TEMPORARY URL Used for testing lot decoding -> The actual URL should be constructed with a constant BASE_URL
        let url = URL(string: "http://kyles-macbook-pro-13.local:3000/Lot/GetLots/\(companyID)/")!
        AF.request(url).response { response in
            let lots = try! JSONDecoder().decode([Lot].self, from: response.data!)
            for lot in lots {
                self.lotAnnotations.append(LotAnnotation(lot: lot))
            }
            self.mapView.addAnnotations(self.lotAnnotations)
        }
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
        centerMap(at: center, zoom: regionZoom)
    }

    func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
        // Check the authorizations again
        verifyLocationAuthorization()
    }

    private func centerMapOnUser() {
        if let location = locationManager.location?.coordinate {
            centerMap(at: location, zoom: regionZoom)
        }
    }

    private func centerMap(at center: CLLocationCoordinate2D, zoom: Double) {
        let region = MKCoordinateRegion(center: center, latitudinalMeters: zoom, longitudinalMeters: zoom)
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

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let lotVC = segue.destination as? LotVC,
            let lot = sender as? Lot {
            lotVC.lot = lot
        }
    }
}

// MARK: - MKMapViewDelegate

extension MapVC: MKMapViewDelegate {

    func mapView(_ mapView: MKMapView, annotationView view: MKAnnotationView, calloutAccessoryControlTapped control: UIControl) {
        // Make sure that we are dealing with a LotAnnotation object
        guard let lotAnnotation = view.annotation as? LotAnnotation else { return }

        // Navigate to LotVC
        performSegue(withIdentifier: "toLotVC", sender: lotAnnotation.lot)
    }

    func mapView(_ mapView: MKMapView, didSelect view: MKAnnotationView) {
        // Center the map on the selected annotation
        if let location = view.annotation {
            self.centerMap(at: location.coordinate, zoom: 350)
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
