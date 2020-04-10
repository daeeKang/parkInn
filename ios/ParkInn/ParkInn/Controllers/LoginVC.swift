//
//  ViewController.swift
//  ParkInn
//
//  Created by Kyle Aquino on 2/11/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit

class LoginVC: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

    @IBAction func loginPressed(_ sender: Any) {
        // Temporarily changing the segue to users. Needs to be worked out later.
        //performSegue(withIdentifier: "toMainVC", sender: nil)
        performSegue(withIdentifier: "toUserSB", sender: nil)
    }
}

