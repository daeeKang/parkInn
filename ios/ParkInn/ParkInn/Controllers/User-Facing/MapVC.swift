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
import MaterialComponents

class MapVC: UIViewController {

    @IBOutlet weak var mapView: MKMapView!
    @IBOutlet weak var pinButton: MDCFloatingButton!
    @IBOutlet weak var locationButton: MDCFloatingButton!
    var searchResultsVC: SearchResultsVC!

    let locationManager = CLLocationManager()
    var lotAnnotations = [LotAnnotation]()

    private var isSettingPin = false
    var searchPin: MKPointAnnotation?
    private var shownPinTip = false

    // Controls the zoom of the mapview
    private let regionZoom: Double = 1000

    override func viewDidLoad() {
        super.viewDidLoad()

        setupMenu()
        setupMapView()
        setupBottomSheet()
        verifyLocationService()

        // FOR DEBUGGING ONLY
        #if DEBUG
        if let location = locationManager.location?.coordinate {
            fetchLots(near: location)
        }
        #endif

        let tapGesture = UITapGestureRecognizer(target: self, action: #selector(mapTapped))
        mapView.addGestureRecognizer(tapGesture)
    }

    private func setupMapView() {
        // Register the custom annotation
        mapView.register(LotMarkerView.self, forAnnotationViewWithReuseIdentifier: MKMapViewDefaultAnnotationViewReuseIdentifier)
    }

    private func setupMenu() {
        // Add gestures for panning to open/close and tap to close
        self.view.addGestureRecognizer(self.revealViewController().panGestureRecognizer())
        self.view.addGestureRecognizer(self.revealViewController().tapGestureRecognizer())
        self.revealViewController()?.delegate = self
    }

    private func setupBottomSheet() {
        // SearchResultsVC
        if #available(iOS 13.0, *) {
            searchResultsVC = UIStoryboard(name: "User", bundle: nil).instantiateViewController(identifier: "SearchResultsVC") as SearchResultsVC
        }
        searchResultsVC.view.isUserInteractionEnabled = true
        searchResultsVC.attach(to: self)
        searchResultsVC.mapVC = self

        // Set location button bottom to this view's top
        mapView.bottomAnchor.constraint(equalTo: searchResultsVC.view.topAnchor).isActive = true
        locationButton.bottomAnchor.constraint(equalTo: searchResultsVC.view.topAnchor, constant: -16).isActive = true
    }

    func fetchLots(near location: CLLocationCoordinate2D, radius: Int = 5) {
        APIService.getLots(latitude: location.latitude, longitude: location.longitude, radius: radius) { [unowned self] result in
            switch result {
                case .success(let lots):
                    self.plotLots(lots)
                case .failure(let error):
                    print(error.localizedDescription)
            }
        }
    }

    func fetchLots(with companyID: String) {
        APIService.getLots(companyID: companyID) { [unowned self] result in
            switch result {
                case .success(let lots):
                    for lot in lots {
                        self.lotAnnotations.append(LotAnnotation(lot: lot))
                    }
                    self.searchResultsVC.lotsToDisplay = lots
                    self.mapView.addAnnotations(self.lotAnnotations)
                case .failure(let error):
                    print(error.localizedDescription)
            }
        }
    }

    func fetchLots(named name: String) {
        APIService.getLots(named: name) { [unowned self] result in
            switch result {
                case .success(let lots):
                    self.plotLots(lots)
                case .failure(let error):
                    print(error)
            }
        }
    }

    func removeSearchPin() {
        if searchPin != nil {
            mapView.removeAnnotation(searchPin!)
        }
    }

    private func plotLots(_ lots: [Lot]) {
        // Clear all current annotations
        self.mapView.removeAnnotations(self.lotAnnotations)
        self.lotAnnotations.removeAll()

        // Insert lots
        for lot in lots {
            self.lotAnnotations.append(LotAnnotation(lot: lot))

            // Append location info
            if let userLocation = locationManager.location {
                let lotLocation = CLLocation(latitude: lot.location.latitude, longitude: lot.location.longitude)
                lot.distanceToUser = userLocation.distance(from: lotLocation) * 0.00062137
            }
        }

        // Add the annotations to the map
        self.mapView.addAnnotations(self.lotAnnotations)

        // Add the lots to the view controller
        self.searchResultsVC.lotsToDisplay = lots
    }

    @IBAction func menuButtonPressed(_ sender: Any) {
        self.revealViewController()?.revealToggle(animated: true)
    }

    @IBAction func locationButtonPressed(_ sender: Any) {
        centerMapOnUser()
        fetchLots(named: "Cottage Cheese")
    }

    @IBAction func pinButtonPressed(_ sender: Any) {
        isSettingPin.toggle()

        if isSettingPin {
            pinButton.setImage(UIImage(systemName: "checkmark"), for: .normal)
            pinButton.backgroundColor = #colorLiteral(red: 0.3411764801, green: 0.6235294342, blue: 0.1686274558, alpha: 1)
        } else {
            pinButton.setImage(UIImage(systemName: "mappin.and.ellipse"), for: .normal)
            pinButton.backgroundColor = #colorLiteral(red: 0.09770665318, green: 0.1281908751, blue: 0.1674916446, alpha: 1)
            if searchPin != nil {
                fetchLots(near: searchPin!.coordinate, radius: 3)
            }
        }

        showPinTip()


    }

    private func showPinTip() {
        if shownPinTip { return }
        shownPinTip = true
        let message = MDCSnackbarMessage()
        message.text = "Tap anywhere on the map to search for parking lots available in that area"

        let action = MDCSnackbarMessageAction()
        action.title = "OK"
        message.action = action

        MDCSnackbarManager.show(message)
    }

    @objc func mapTapped(sender: UIGestureRecognizer){
        guard isSettingPin else { return }
        if sender.state == .ended {
            let locationInView = sender.location(in: mapView)
            let locationOnMap = mapView.convert(locationInView, toCoordinateFrom: mapView)
            addSearchPin(location: locationOnMap)
        }
    }

    func addSearchPin(location: CLLocationCoordinate2D){
        if searchPin != nil { mapView.removeAnnotation(searchPin!) }
        let annotation = MKPointAnnotation()
        annotation.coordinate = location

        searchPin = annotation
        self.mapView.addAnnotation(annotation)
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

    func mapView(_ mapView: MKMapView, viewFor annotation: MKAnnotation) -> MKAnnotationView? {
        if annotation is MKPointAnnotation {

            let reuseId = "pin"
            var pinView = mapView.dequeueReusableAnnotationView(withIdentifier: reuseId) as? MKPinAnnotationView

            if pinView == nil {
                pinView = MKPinAnnotationView(annotation: annotation, reuseIdentifier: reuseId)
                pinView!.pinTintColor = UIColor.black
                pinView!.animatesDrop = true
            }
            else {
                pinView!.annotation = annotation
            }
            return pinView
        }
        return nil
    }

    func mapView(_ mapView: MKMapView, annotationView view: MKAnnotationView, calloutAccessoryControlTapped control: UIControl) {
        // Make sure that we are dealing with a LotAnnotation object
        print(view.annotation)
        guard let lotAnnotation = view.annotation as? LotAnnotation else { return }
        // Navigate to LotVC
        performSegue(withIdentifier: "toLotVC", sender: lotAnnotation.lot)
    }

    func mapView(_ mapView: MKMapView, didSelect view: MKAnnotationView) {
        // Center the map on the selected annotation
        if let location = view.annotation as? LotAnnotation {
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
