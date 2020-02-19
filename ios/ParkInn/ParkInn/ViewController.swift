//
//  ViewController.swift
//  ParkInn
//
//  Created by Kyle Aquino on 2/11/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

    @IBAction func loginPressed(_ sender: Any) {
        performSegue(withIdentifier: "toMainVC", sender: nil)
    }
}

