<template>
    <!-- WRAPPER -->
    <div id="wrapper">
        <!-- MAIN CONTENT -->
        <div class="main-content">
            <div class="container">
                <h3 class="page-title">Yolhizmeti</h3>
                <div class="panel">
                    <div class="panel-heading">
                        <div style="display: flex; justify-content:space-between;">
                            <h3 class="panel-title">
                                <input type="text" placeholder="Ara..." class="form-control">
                            </h3>
                            <a href="#" class="btn btn-primary">
                                <i class="fas fa-plus"></i>
                                Alt Proje Ekle
                            </a>
                        </div>
                    </div>
                    <div class="panel-body">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Proje</th>
                                    <th>Kayıt Tarihi</th>
                                    <th style="text-align:end;"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <RouterLink :to="{ name: 'Panel', params: { app: 'kurumsal' } }"
                                            style="display: block;">
                                            <i class="fas fa-folder text-muted" style="margin-right: 5px;"></i>
                                            Kurumsal
                                        </RouterLink>
                                    </td>
                                    <td>2023-04-26</td>
                                    <td style="text-align:end;">
                                        <div style="">
                                            <a href="" class="btn btn-sm btn-info" style="margin-right: 10px;">
                                                Panele Bağlan
                                            </a>
                                            <a href="" class="btn btn-sm btn-danger">
                                                Sil
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- END TABLE HOVER -->
            </div>
        </div>
        <!-- END MAIN CONTENT -->
        <div>
            <div class="clearfix"></div>
            <footer>
                <div class="container-fluid">
                    <p class="copyright">&copy; 2022 <a href="https://www.markapress.com" target="_blank">Marka Press
                            Digital
                            Software
                            Agency</a>. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    </div>
    <!-- END WRAPPER -->
</template>

<script setup>
</script>