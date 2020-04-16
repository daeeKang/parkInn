//
//  ManagementVC.swift
//  ParkInn
//
//  Created by Kyle Aquino on 2/13/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit

//classe to manage cell structure
class ManagementVC: UIViewController, UICollectionViewDataSource, UICollectionViewDelegate {

    @IBOutlet private weak var collectionView: UICollectionView!
    

    var lots = [Lot]()
    
    override func viewDidLoad() {
        super.viewDidLoad()

        fetchLots(with: "8e9fe90e-bd10-48d2-8084-8f259157c832")

        //set up the amount of columns
        let width = (view.frame.size.width - 20) / 2
        //variable layout to access properties of collectionView
        let layout = collectionView.collectionViewLayout as! UICollectionViewFlowLayout
        
        //size of each cell
        layout.itemSize = CGSize(width: width, height: width)
        //space for all corners of the cell
        layout.sectionInset = UIEdgeInsets(top: 20, left: 5, bottom: 20, right: 5)
        
        
    }

    private func fetchLots(with companyID: String) {
        APIService.getLots(companyID: companyID) { [unowned self] result in
            switch result {
                case .success(let lots):
                    self.lots = lots
                    self.collectionView.reloadData()
                case .failure(let error):
                    print(error.localizedDescription)
            }
        }
    }
    
    //get number of items in the array
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return lots.count
    }
    
    //iterates the cells applying any modifications
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "manageCell", for: indexPath) as! ManagementCVCell

        let currentLot = lots[indexPath.row]
        
        cell.DisplayLot.layer.cornerRadius = 26
        cell.LabelLot.layer.cornerRadius = 10
        cell.LabelLot.layer.masksToBounds = true
        
        if currentLot.imageURL != nil {
            let url = URL(string: currentLot.imageURL!)!
            cell.DisplayLot.load(url: url)
        } else {
            // Display no image
        }

     
        cell.LabelLot.backgroundColor = UIColor.white
        cell.LabelLot.textColor = UIColor.black
        cell.LabelLot.text = currentLot.name

        
        return cell
        
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        let currentLot = lots[indexPath.row]

        let mainStoryboard:UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
        let desVC = mainStoryboard.instantiateViewController(identifier: "DisplayVC") as! DisplayVC
        
        desVC.lot = currentLot
        
        self.navigationController?.pushViewController(desVC, animated: true)
        
        
    }

}
