<template>
  <div class='row'>
    <div class='col-md-6 offset-md-3'>

      <!-- Business Hours Widget -->
      <div class='widget business-widget'>
        <div class='widget-content'>
          <div class='listing-hours'>
            <div class='listing-day current'>
              <div class='day'>Today <span>5 Nov 2019</span></div>
              <div class='time-items'>
                <span class='open-status'><span class='badge bg-success-light'>Open Now</span></span>
                <span class='time'>07:00 AM - 09:00 PM</span>
              </div>
            </div>
            <div class='listing-day'>
              <div class='day'>Monday</div>
              <div class='time-items'>
                <span class='time'>07:00 AM - 09:00 PM</span>
              </div>
            </div>
            <div class='listing-day'>
              <div class='day'>Tuesday</div>
              <div class='time-items'>
                <span class='time'>07:00 AM - 09:00 PM</span>
              </div>
            </div>
            <div class='listing-day'>
              <div class='day'>Wednesday</div>
              <div class='time-items'>
                <span class='time'>07:00 AM - 09:00 PM</span>
              </div>
            </div>
            <div class='listing-day'>
              <div class='day'>Thursday</div>
              <div class='time-items'>
                <span class='time'>07:00 AM - 09:00 PM</span>
              </div>
            </div>
            <div class='listing-day'>
              <div class='day'>Friday</div>
              <div class='time-items'>
                <span class='time'>07:00 AM - 09:00 PM</span>
              </div>
            </div>
            <div class='listing-day'>
              <div class='day'>Saturday</div>
              <div class='time-items'>
                <span class='time'>07:00 AM - 09:00 PM</span>
              </div>
            </div>
            <div class='listing-day closed'>
              <div class='day'>Sunday</div>
              <div class='time-items'>
                <span class='time'><span class='badge bg-danger-light'>Closed</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Business Hours Widget -->

    </div>
  </div>
</template>

<script>
export default {
  name: 'profile-work-hours'
}
</script>

<style scoped>

</style>
