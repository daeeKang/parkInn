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

    private let cornerRadius: CGFloat = 12.0

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        roundCorners()
    }

    private func roundCorners() {
        statsButton.layer.cornerRadius = self.cornerRadius
        managementButton.layer.cornerRadius = self.cornerRadius
    }

    // MARK: - Segues

    @IBAction func openStatsVC(_ sender: Any) {
        performSegue(withIdentifier: "toStatsVC", sender: nil)
    }

    @IBAction func openManagementVC(_ sender: Any) {
        performSegue(withIdentifier: "toManagementVC", sender: nil)
    }
}
