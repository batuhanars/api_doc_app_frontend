<template>
    <!-- WRAPPER -->
    <div id="wrapper">
        <!-- NAVBAR -->
        <Topbar />
        <!-- END NAVBAR -->
        <!-- LEFT SIDEBAR -->
        <Sidebar />
        <!-- END LEFT SIDEBAR -->
        <!-- MAIN -->
        <div class="main">
            <!-- MAIN CONTENT -->
            <div class="main-content">
                <RouterView />
            </div>
            <!-- END MAIN CONTENT -->
        </div>
        <!-- END MAIN -->
        <Footer />
    </div>
    <!-- END WRAPPER -->
</template>

<script setup>
import Sidebar from "./Sidebar.vue";
import Topbar from "./Topbar.vue";
import Footer from "./Footer.vue";
</script>