//
//  MyReservationsVC.swift
//  ParkInn
//
//  Created by Kyle Aquino on 4/29/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit

class MyReservationsVC: UIViewController {

    var reservations = [Reservation]()

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        fetchReservations()
    }

    private func fetchReservations() {
        let email = SessionManager.shared.customerProfile!.username
        APIService.getReservations(email: email) { [unowned self] (result) in
            switch result {
                case .success(let reservations):
                    self.reservations = reservations
                case .failure(let error):
                    fatalError(error.localizedDescription)
            }
        }
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
