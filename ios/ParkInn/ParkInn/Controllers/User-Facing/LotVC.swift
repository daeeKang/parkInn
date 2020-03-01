//
//  LotVC.swift
//  ParkInn
//
//  Created by Kyle Aquino on 3/1/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit

class LotVC: UIViewController {

    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var descriptionLabel: UILabel!

    var lotInfo: (String, String)?

    override func viewDidLoad() {
        super.viewDidLoad()

        populateView()
    }

    private func populateView() {
        guard lotInfo != nil else { return }
        nameLabel.text = lotInfo!.0
        descriptionLabel.text = lotInfo!.1
    }

}
