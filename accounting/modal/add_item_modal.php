<?php 
require_once('../class/Item.php'); 
require_once('../class/Employee.php'); 

$employees = $employee->get_employees();
$categories = $item->item_categories();
$conditions = $item->item_conditions();

?>
<div class="modal fade" id="modal-add-item">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">Add Item</h4>
			</div>
			<div class="modal-body">
				<!-- main form -->
					<form class="form-horizontal" role="form" id="add-item-form">

					  <div class="form-group">
					    <label class="control-label col-sm-3" for="accountNumber">Account Number:</label>
					    <div class="col-sm-9">
					      <input type="text" class="form-control" id="accountNumber" placeholder="Enter Account Number">
					    </div>
					  </div>

					  <div class="form-group">
					    <label class="control-label col-sm-3" for="ownerAddress">Address:</label>
					    <div class="col-sm-9">
					      <input type="text" class="form-control" id="ownerAddress" placeholder="Enter Owner's Address">
					    </div>
					  </div>					  

					  <div class="form-group">
					    <label class="control-label col-sm-3" for="itemname">Plate Number:</label>
					    <div class="col-sm-9">
					      <input type="text" class="form-control" id="itemname" placeholder="Enter Plate Number" autofocus>
					    </div>
					  </div>

					  <div class="form-group" id="sr">
					    <label class="control-label col-sm-3" for="serialNumber">Color:</label>
					    <div class="col-sm-9"> 
					      <input type="text" class="form-control" id="serialNumber" placeholder="Enter Color">
					    </div>
					  </div>

					   <div class="form-group" id="mn">
					    <label class="control-label col-sm-3" for="modelNumber">Make:</label>
					    <div class="col-sm-9"> 
					      <input type="text" class="form-control" id="modelNumber" placeholder="Enter Make">
					    </div>
					  </div>
					
					  <div class="form-group" id="b">
					    <label class="control-label col-sm-3" for="brand">Model</label>
					    <div class="col-sm-9"> 
					      <input type="text" class="form-control" id="brand" placeholder="Enter Model">
					    </div>
					  </div>

					  <div class="form-group">
					    <label class="control-label col-sm-3" for="amount">Owner:</label>
					    <div class="col-sm-9"> 
					      <input type="text" class="form-control" id="amount" placeholder="Enter Owner">
					    </div>
					  </div>

					  <div class="form-group">
					    <label class="control-label col-sm-3" for="rfidCode">RFID Code:</label>
					    <div class="col-sm-9"> 
					      <input type="text" class="form-control" id="rfidCode" placeholder="Enter RFID code">
					    </div>
					  </div>

					  <div class="form-group">
					    <label class="control-label col-sm-3" for="stickerType">Parking sticker type:</label>
					    <div class="col-sm-9"> 
					      <input type="text" class="form-control" id="stickerType" placeholder="Enter sticker type">
					    </div>
					  </div>	

					  <div class="form-group">
					    <label class="control-label col-sm-3" for="stickerNumber">Parking sticker number:</label>
					    <div class="col-sm-9"> 
					      <input type="text" class="form-control" id="stickerNumber" placeholder="Enter sticker number">
					    </div>
					  </div>		

					   <div class="form-group">
					    <label class="control-label col-sm-3" for="purDate">Register Date:</label>
					    <div class="col-sm-9"> 
					      <input type="date" class="form-control" id="purDate" >
					    </div>
					  </div>	

					<div class="form-group">
					    <label class="control-label col-sm-3" for="catID">Category:</label>
					    <div class="col-sm-3"> 
					    	<select name="" class="btn btn-default" id="catID">
					    		<?php 
					    			foreach ($categories as $category) {
					    				# code...
					    			$catID = $category['cat_id'];
					    			$catDesc = ucwords($category['cat_desc']);
					    		?>
					    			<option value="<?php echo $catID; ?>"><?php echo $catDesc; ?></option>}
					    		<?php
					    			}//end foreach of category
					    		 ?>
					    	</select>
					    </div>
					  </div>
					
				    <div class="form-group">
					    <label class="control-label col-sm-3" for="empID">Employee:</label>
					    <div class="col-sm-9"> 
					    	<select class="btn btn-default" id="empID">
					    		
								<?php 
									foreach ($employees as $empployee) {
										# code..
									$fN = $empployee['emp_fname'];
									$mN = $empployee['emp_mname'];
									$lN = $empployee['emp_lname'];
									$fullName = "$fN $mN $lN";
									$fullName = ucwords($fullName);
									$emp_id = $empployee['emp_id'];
								?>	
									<option value="<?php echo $emp_id; ?>"><?php echo $fullName; ?></option>}
								<?php
									}//end foreach
								 ?>					    		
					    	</select>
					    </div>
					  </div>	

					 <!-- old cat pos -->

					  <div class="form-group">
					    <label class="control-label col-sm-3" for="conID">Condition:</label>
					    <div class="col-sm-3"> 
					    	<select name="" class="btn btn-default" id="conID" disabled>
					    		<option value="4">Working</option>}
					    	</select>
					    </div>
					  </div>

					  <div class="form-group"> 
					    <div class="col-sm-offset-2 col-sm-10">
					      <button type="submit" id="btn-submit" value="add" class="btn btn-primary">Save
					      <span class="glyphicon glyphicon-saved" aria-hidden="true"></span>
					      </button>
					    </div>
					  </div>
					</form>
				<!-- /main form -->
			</div>
		</div>
	</div>
</div>
