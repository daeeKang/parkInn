//
//  ViewController.swift
//  ParkInn
//
//  Created by Kyle Aquino on 2/11/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit
import Auth0

class LoginVC: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        Auth0
            .webAuth()
            .clearSession(federated:false) { [weak self] in
                switch $0 {
                    case true:
                        print("logged out")
                    case false:
                        print("logged out failed")
                }
        }
    }

    @IBAction func loginPressed(_ sender: Any) {
//        performSegue(withIdentifier: "toMainVC", sender: nil)
       Auth0
            .webAuth()
            .scope("openid profile")
            .audience("https://parkinn.auth0.com/userinfo")
            .start {
                switch $0 {
                case .failure(let error):
                    // Handle the error
                    print("Error: \(error)")
                case .success(let credentials):
                    // Do something with credentials e.g.: save them.
                    // Auth0 will automatically dismiss the login page
                    guard let accessToken = credentials.accessToken else {
                        // Handle Error
                        return
                    }

                    Auth0
                        .authentication()
                        .userInfo(withAccessToken: accessToken)
                        .start { [weak self] result in
                            switch(result) {
                            case .success(let profile):
                                // You've got the user's profile, good time to store it locally.
                                // e.g. self.profile = profile
                                print("Profile: \(profile.nickname)")
                                if (profile.nickname == "admin" || profile.nickname == "staff") {
                                    DispatchQueue.main.async {
                                        self?.performSegue(withIdentifier: "toMainVC", sender: nil)
                                    }
                                } else if (profile.nickname == "user") {
                                    // Segue to the user side
                                }
                            case .failure(let error):
                                // Handle the error
                                print("Error: \(error)")
                            }
                        }

                    
                }
        }
    }
}

