//
//  ProfileVC.swift
//  ParkInn
//
//  Created by Kyle Aquino on 4/29/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit

class ProfileVC: UIViewController {

    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var emailLabel: UILabel!
    @IBOutlet weak var carLabel: UILabel!
    @IBOutlet weak var licensePlateLabel: UILabel!

    var customerProfile: CustomerProfile!

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        populateFields()
    }

    private func populateFields() {
        nameLabel.text = self.customerProfile.fullName
        emailLabel.text = self.customerProfile.username

        let car = customerProfile.cars[0]
        carLabel.text = "\(car.color.capitalized) \(car.make.capitalized) \(car.model.capitalized)"
        licensePlateLabel.text = car.license
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
