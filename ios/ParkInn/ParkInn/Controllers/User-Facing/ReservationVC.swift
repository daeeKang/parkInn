//
//  ReservationVC.swift
//  ParkInn
//
//  Created by Kyle Aquino on 4/22/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit

class ReservationVC: UIViewController {

    var lot: Lot!
    var lotDesign: LotDesign!

    override func viewDidLoad() {
        super.viewDidLoad()

        fetchLotDesign()
    }

    private func fetchLotDesign() {
        APIService.getLotDesign(companyID: lot.companyID, lotID: "\(lot.lotID)") { [unowned self] result in
            switch result {
                case .success(let lotDesign):
                    self.lotDesign = lotDesign
                    print(lotDesign)
                case .failure(let error):
                    fatalError(error.localizedDescription)
            }
        }
    }

}
