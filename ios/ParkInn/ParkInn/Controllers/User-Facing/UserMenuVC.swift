//
//  UserMenuVC.swift
//  ParkInn
//
//  Created by Kyle Aquino on 2/28/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit
import Auth0

class UserMenuVC: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override var prefersStatusBarHidden: Bool { return true }

    @IBAction func profilePressed(_ sender: Any) {
        performSegue(withIdentifier: "toProfileVC", sender: nil)
    }

    @IBAction func reservationsPressed(_ sender: Any) {
        performSegue(withIdentifier: "toMyReservationsVC", sender: nil)
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

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let profileVC = segue.destination as? ProfileVC {
            profileVC.customerProfile = SessionManager.shared.customerProfile!
        }
    }
}
