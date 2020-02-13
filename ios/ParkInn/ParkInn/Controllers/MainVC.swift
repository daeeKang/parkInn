//
//  MainVC.swift
//  ParkInn
//
//  Created by Kyle Aquino on 2/12/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit
import MaterialComponents

class MainVC: UIViewController {

    @IBOutlet weak var statsButton: MDCButton!
    @IBOutlet weak var managementButton: MDCButton!
    @IBOutlet weak var menuButton: UIBarButtonItem!

    private let cornerRadius: CGFloat = 12.0

    override func viewDidLoad() {
        super.viewDidLoad()

        roundCorners()
        setupMenu()
    }

    // Rounds the Corners of the buttons
    private func roundCorners() {
        statsButton.layer.cornerRadius = self.cornerRadius
        managementButton.layer.cornerRadius = self.cornerRadius
    }

    // Sets up the gestures and action for Menu button
    private func setupMenu() {
        self.menuButton.target = self.revealViewController()
        self.menuButton.action = #selector(SWRevealViewController.revealToggle(_:))

        // Add gestures for panning to open/close and tap to close
        self.view.addGestureRecognizer(self.revealViewController().panGestureRecognizer())
        self.view.addGestureRecognizer(self.revealViewController().tapGestureRecognizer())
        self.statsButton.addGestureRecognizer(self.revealViewController().tapGestureRecognizer())
        self.managementButton.addGestureRecognizer(self.revealViewController().tapGestureRecognizer())
    }

    // MARK: - Segues

    @IBAction func openStatsVC(_ sender: Any) {
        performSegue(withIdentifier: "toStatsVC", sender: nil)
    }

    @IBAction func openManagementVC(_ sender: Any) {
        performSegue(withIdentifier: "toManagementVC", sender: nil)
    }
}
