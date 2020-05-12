//
//  MenuVC.swift
//  ParkInn
//
//  Created by John Hanifzai on 2/18/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit
import Auth0

class MenuVC: UIViewController {

    weak var navControl: UINavigationController?
    weak var mainVC: MainVC?

    override func viewDidLoad() {
        super.viewDidLoad()

        // Setup weak references to navigation controller and MainVC for segue use
        if let navControl = revealViewController()?.frontViewController as? UINavigationController,
            let mainVC = navControl.children.first as? MainVC {
            self.navControl = navControl
            self.mainVC = mainVC
        }
    }

    @IBAction func settingsPressed(_ sender: Any) {
        mainVC?.performSegue(withIdentifier: "toSettingsVC", sender: nil)
    }
    
    @IBAction func statisticsPressed(_ sender: Any) {
        mainVC?.performSegue(withIdentifier: "toStatsVC", sender: nil)
    }
    
    @IBAction func managmentPressed(_ sender: Any) {
        mainVC?.performSegue(withIdentifier: "toManagementVC", sender: nil)
    }
    
    @IBAction func logoutPressed(_ sender: Any) {
        Auth0
        .webAuth()
        .clearSession(federated:false) { [weak self] in
            switch $0 {
                case true:
                    print("logged out")
                    Timer.scheduledTimer(withTimeInterval: 1.0, repeats: false) { [weak self] (_) in
                        DispatchQueue.main.async {
                            SessionManager.shared.logout()
                            self?.presentingViewController?.dismiss(animated: true, completion: nil)
                        }
                    }
                case false:
                    print("logged out failed")
            }
        }
    }
}
