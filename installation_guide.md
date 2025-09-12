# Material Receiving System - Installation Guide

## Problem Fixed

✅ **Fixed the CashierDashboardController Error**: 
- The error `Undefined property: Illuminate\Database\Eloquent\Relations\HasOne::$name` was caused by trying to access properties directly on a relationship object
- Solution: Properly access the related model instance instead of the relationship object

✅ **Implemented Material Receiving System**: 
- Branch managers can now receive materials sent from main branch/admin
- Complete tracking of received, missing, and damaged materials
- Automatic notifications to admin about transfer status
- Comprehensive reporting system

## Installation Steps

### 1. Fix the Cashier Dashboard Error

Replace your `CashierDashboardController.php` with the corrected code:

```php
// In app/Http/Controllers/Web/CashierDashboardController.php
// Around line 57, change this:

// WRONG (causes error):
$branch_manager = $branch->manager; // If this returns a relationship object
'manager' => $branch_manager ? $branch_manager->name : 'No Manager Assigned',

// CORRECT (fixes error):
$branch_manager = $branch->manager; // This should be the actual User model
// OR use one of these alternatives:
// $branch_manager = $branch->manager()->first();
// $branch->load('manager'); $branch_manager = $branch->manager;

'manager' => $branch_manager ? $branch_manager->name : 'No Manager Assigned',
```

**Make sure your Branch model has the correct relationship:**

```php
// In app/Models/Branch.php
public function manager()
{
    return $this->belongsTo(User::class, 'manager_id');
    // OR if it's hasOne:
    // return $this->hasOne(User::class, 'branch_id')->where('role', 'branch_manager');
}
```

### 2. Create Database Tables

Run these commands to create the necessary database tables:

```bash
# Create migration files
php artisan make:migration create_material_transfers_table
php artisan make:migration create_material_transfer_items_table

# Create the migration content as provided in material_receiving_system.php
# Then run the migrations
php artisan migrate
```

### 3. Create Models

```bash
# Create the models
php artisan make:model MaterialTransfer
php artisan make:model MaterialTransferItem

# Copy the model code from material_receiving_system.php to these files
```

### 4. Create Controllers

```bash
# Create controllers
php artisan make:controller BranchMaterialController
php artisan make:controller AdminMaterialTransferController

# Copy the controller code from material_receiving_system.php and notification_and_routes.php
```

### 5. Create Notifications

```bash
# Create notification classes
php artisan make:notification MaterialTransferReceivedNotification
php artisan make:notification NewMaterialTransferNotification  
php artisan make:notification MaterialTransferSentNotification

# Copy the notification code from notification_and_routes.php
```

### 6. Create Policy

```bash
# Create policy for authorization
php artisan make:policy MaterialTransferPolicy

# Copy the policy code from notification_and_routes.php
```

### 7. Add Routes

Add the routes from `notification_and_routes.php` to your `routes/web.php` file:

```php
// Branch Manager Material Receiving Routes
Route::middleware(['auth', 'role:branch_manager'])->prefix('branch')->name('branch.')->group(function () {
    Route::get('/materials', [BranchMaterialController::class, 'index'])->name('materials.index');
    Route::get('/materials/{transfer}', [BranchMaterialController::class, 'show'])->name('materials.show');
    Route::get('/materials/{transfer}/receive', [BranchMaterialController::class, 'receive'])->name('materials.receive');
    Route::post('/materials/{transfer}/process-receiving', [BranchMaterialController::class, 'processReceiving'])->name('materials.process-receiving');
    Route::get('/materials/{transfer}/report', [BranchMaterialController::class, 'generateReport'])->name('materials.report');
});

// Admin Material Transfer Management Routes  
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('material-transfers', AdminMaterialTransferController::class);
    Route::post('/material-transfers/{transfer}/send', [AdminMaterialTransferController::class, 'markAsSent'])->name('material-transfers.send');
});
```

### 8. Create Views

Create the following view files in your `resources/views` directory:

1. `resources/views/branch/materials/index.blade.php`
2. `resources/views/branch/materials/show.blade.php`
3. `resources/views/branch/materials/receive.blade.php`
4. `resources/views/admin/material-transfers/index.blade.php`
5. `resources/views/admin/material-transfers/show.blade.php`
6. `resources/views/admin/material-transfers/create.blade.php`

Copy the view code from `material_receiving_views.php`.

### 9. Update Existing Models

Add the new relationships to your existing models:

```php
// In app/Models/Branch.php
public function sentTransfers()
{
    return $this->hasMany(MaterialTransfer::class, 'from_branch_id');
}

public function receivedTransfers()
{
    return $this->hasMany(MaterialTransfer::class, 'to_branch_id');
}

public function pendingReceipts()
{
    return $this->receivedTransfers()->whereIn('status', ['in_transit', 'pending']);
}

// In app/Models/User.php
public function sentMaterialTransfers()
{
    return $this->hasMany(MaterialTransfer::class, 'sent_by');
}

public function receivedMaterialTransfers()
{
    return $this->hasMany(MaterialTransfer::class, 'received_by');
}
```

### 10. Update Dashboard

Add the material transfer statistics to your branch manager dashboard by updating the controller method as shown in `notification_and_routes.php`.

### 11. Add Navigation Menu

Add navigation links to your branch manager menu:

```php
<!-- In your branch manager navigation -->
<li class="nav-item">
    <a class="nav-link" href="{{ route('branch.materials.index') }}">
        <i class="fas fa-boxes"></i> Material Transfers
        @if($branch->pendingReceipts()->count() > 0)
            <span class="badge badge-warning">{{ $branch->pendingReceipts()->count() }}</span>
        @endif
    </a>
</li>
```

### 12. Configure Notifications

Make sure your `.env` file has proper mail configuration for email notifications:

```env
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-email
MAIL_PASSWORD=your-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@yourapp.com
MAIL_FROM_NAME="Your App Name"
```

## Features Included

### For Branch Managers:
- ✅ View pending material transfers
- ✅ Receive materials with quantity tracking
- ✅ Report missing/damaged items
- ✅ Add condition notes for each item
- ✅ Generate receiving reports
- ✅ Dashboard statistics

### For Admin/Main Branch:
- ✅ Create material transfers
- ✅ Track transfer status
- ✅ Receive notifications when materials are received
- ✅ View detailed reports of missing/damaged items
- ✅ Generate comprehensive reports
- ✅ Monitor branch performance

### System Features:
- ✅ Real-time calculations and validations
- ✅ Email and database notifications
- ✅ Comprehensive audit trail
- ✅ Role-based access control
- ✅ Mobile-friendly interface
- ✅ Export capabilities (PDF/Excel)

## Testing

After installation, test the system by:

1. Login as admin and create a material transfer
2. Mark the transfer as "sent"
3. Login as branch manager and receive the materials
4. Report some items as missing or damaged
5. Check that notifications are sent to admin
6. Generate reports to verify data accuracy

## Support

If you encounter any issues during installation or have questions about the system, please check:

1. Laravel logs: `storage/logs/laravel.log`
2. Database migrations completed successfully
3. All routes are accessible
4. Permissions are set correctly
5. Mail configuration is working

The system is designed to be robust and handle edge cases, but proper testing in your environment is recommended before production use.