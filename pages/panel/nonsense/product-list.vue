<template>
 <div>
<!-- Page Wrapper -->
<div class="page-wrapper">
    <div class="content container-fluid">

        <!-- Page Header -->
        <div class="page-header">
            <div class="row">
                <div class="col-sm-7 col-auto">
                    <h3 class="page-title">Product List</h3>
                    <ul class="breadcrumb">
                        <li class="breadcrumb-item"><NuxtLink to="admin_index">Dashboard</NuxtLink></li>
                        <li class="breadcrumb-item active">Product List</li>
                    </ul>
                </div>
                <div class="col-sm-5 col">
                    <a href="#Add_Specialities_details" data-toggle="modal" class="btn btn-primary float-right mt-2">Add</a>
                </div>
            </div>
        </div>
        <!-- /Page Header -->
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="datatable table table-hover table-center mb-0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Date</th>
                                        <th class="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>#SP001</td>

                                        <td>
                                            <h2 class="table-avatar">
                                                <a class="avatar avatar-sm mr-2" data-toggle="modal" href="#edit_specialities_details">
                                                    <img class="avatar-img rounded-circle" src='../../../assets/admin_img/product/product.jpg' alt="product image">
                                                </a>
                                                <a data-toggle="modal" href="#edit_specialities_details">Safi Natural Blood Purifier Syrup 200 ml</a>
                                            </h2>
                                        </td>

                                        <td>$500</td>

                                        <td>12-05-2020</td>

                                        <td class="text-right">
                                            <div class="actions">
                                                <a class="btn btn-sm bg-success-light" data-toggle="modal" href="#edit_specialities_details">
                                                    <i class="far fa-edit"></i> Edit
                                                </a>
                                                <a  data-toggle="modal" href="#delete_modal" class="btn btn-sm bg-danger-light">
                                                    <i class="far fa-trash-alt"></i> Delete
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>#SP002</td>

                                        <td>
                                            <h2 class="table-avatar">
                                                <a class="avatar avatar-sm mr-2" data-toggle="modal" href="#edit_specialities_details">
                                                    <img class="avatar-img rounded-circle" src='../../../assets/admin_img/product/product.jpg' alt="product image">
                                                </a>
                                                <a data-toggle="modal" href="#edit_specialities_details">Safi Natural Blood Purifier Syrup 100 ml</a>
                                            </h2>
                                        </td>

                                        <td>$100</td>

                                        <td>12-05-2020</td>

                                        <td class="text-right">
                                            <div class="actions">
                                                <a class="btn btn-sm bg-success-light" data-toggle="modal" href="#edit_specialities_details">
                                                    <i class="far fa-edit"></i> Edit
                                                </a>
                                                <a  data-toggle="modal" href="#delete_modal" class="btn btn-sm bg-danger-light">
                                                    <i class="far fa-trash-alt"></i> Delete
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>#SP003</td>

                                        <td>
                                            <h2 class="table-avatar">
                                                <a class="avatar avatar-sm mr-2" data-toggle="modal" href="#edit_specialities_details">
                                                    <img class="avatar-img rounded-circle" src='../../../assets/admin_img/product/product.jpg' alt="product image">
                                                </a>
                                                <a data-toggle="modal" href="#edit_specialities_details">Safi Natural Blood Purifier Syrup 50 ml</a>
                                            </h2>
                                        </td>

                                        <td>$600</td>

                                        <td>12-05-2020</td>

                                        <td class="text-right">
                                            <div class="actions">
                                                <a class="btn btn-sm bg-success-light" data-toggle="modal" href="#edit_specialities_details">
                                                    <i class="far fa-edit"></i> Edit
                                                </a>
                                                <a  data-toggle="modal" href="#delete_modal" class="btn btn-sm bg-danger-light">
                                                    <i class="far fa-trash-alt"></i> Delete
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>#SP004</td>

                                        <td>
                                            <h2 class="table-avatar">
                                                <a class="avatar avatar-sm mr-2" data-toggle="modal" href="#edit_specialities_details">
                                                    <img class="avatar-img rounded-circle" src='../../../assets/admin_img/product/product.jpg' alt="product image">
                                                </a>
                                                <a data-toggle="modal" href="#edit_specialities_details">Safi Natural Blood Purifier Syrup 200 ml</a>
                                            </h2>
                                        </td>

                                        <td>$700</td>

                                        <td>12-05-2020</td>

                                        <td class="text-right">
                                            <div class="actions">
                                                <a class="btn btn-sm bg-success-light" data-toggle="modal" href="#edit_specialities_details">
                                                    <i class="far fa-edit"></i> Edit
                                                </a>
                                                <a  data-toggle="modal" href="#delete_modal" class="btn btn-sm bg-danger-light">
                                                    <i class="far fa-trash-alt"></i> Delete
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>#SP005</td>

                                        <td>
                                            <h2 class="table-avatar">
                                                <a class="avatar avatar-sm mr-2" data-toggle="modal" href="#edit_specialities_details">
                                                    <img class="avatar-img rounded-circle" src='../../../assets/admin_img/product/product.jpg' alt="product image">
                                                </a>
                                                <a data-toggle="modal" href="#edit_specialities_details">Safi Natural Blood Purifier Syrup 200 ml</a>
                                            </h2>
                                        </td>

                                        <td>$1200</td>

                                        <td>12-05-2020</td>

                                        <td class="text-right">
                                            <div class="actions">
                                                <a class="btn btn-sm bg-success-light" data-toggle="modal" href="#edit_specialities_details">
                                                    <i class="far fa-edit"></i> Edit
                                                </a>
                                                <a  data-toggle="modal" href="#delete_modal" class="btn btn-sm bg-danger-light">
                                                    <i class="far fa-trash-alt"></i> Delete
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- /Page Wrapper -->


<!-- Add Modal -->
<div class="modal fade" id="Add_Specialities_details" aria-hidden="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Add Product</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="row form-row">
                        <div class="col-12 col-sm-6">
                            <div class="form-group">
                                <label>Product Name</label>
                                <input type="text" class="form-control">
                            </div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <div class="form-group">
                                <label>Price</label>
                                <input type="text" class="form-control">
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <label>Image</label>
                                <input type="file"  class="form-control">
                            </div>
                        </div>

                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Save Changes</button>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- /ADD Modal -->

<!-- Edit Details Modal -->
<div class="modal fade" id="edit_specialities_details" aria-hidden="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Edit Product</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="row form-row">
                        <div class="col-12 col-sm-6">
                            <div class="form-group">
                                <label>Product Name</label>
                                <input type="text" class="form-control">
                            </div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <div class="form-group">
                                <label>Price</label>
                                <input type="text" class="form-control">
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <label>Image</label>
                                <input type="file"  class="form-control">
                            </div>
                        </div>

                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Save Changes</button>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- /Edit Details Modal -->

<!-- Delete Modal -->
<div class="modal fade" id="delete_modal" aria-hidden="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document" >
        <div class="modal-content">
            <div class="modal-body">
                <div class="form-content p-2">
                    <h4 class="modal-title">Delete</h4>
                    <p class="mb-4">Are you sure want to delete?</p>
                    <button type="button" class="btn btn-primary">Save </button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- /Delete Modal -->
  <Nuxt />
 </div>
</template>

<script>
export default {
     mounted() {
        // Datatable

    if ($('.datatable').length > 0) {
        $('.datatable').DataTable({
            "bFilter": false,
        });
    }
    },
    head: {
    title: 'Doccure - Product List Page'
  },
    layout: 'admin',
	computed: {
       currentPath() {
           return this.$route.name
	   },
	}
}
</script>
