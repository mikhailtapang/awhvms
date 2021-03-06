<?php 
interface iItem{
	public function insert_item($account_number, $owner_address, $iN, $sN, $mN, $b, $a, $rfid_code, $sticker_type, 
		$sticker_number, $pD);
	public function update_item($account_number, $owner_address, $iN, $sN, $mN, $b, $a, $rfid_code, $sticker_type, 
		$sticker_number, $pD, $iID);
	public function insert_violation($driver_name, $date_apprehended, $violation_officer, $violation_number, $violation, $iID, $status);
	public function insert_payment($amount_paid, $or_number, $date_paid, $vID, $iID);
	public function get_item($id);
	public function get_all_items();
	public function item_categories();
	public function item_conditions();
	public function item_report($choice);
	public function get_vehicle($id);
}


