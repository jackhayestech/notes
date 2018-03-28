<!doctype html>
<html>
<head>
    @include('includes.head')
</head>
<body>
<div class="container-fluid body-content">

    <header id="header-container" class="row">
        @include('includes.header')
    </header>

    <div id="main-container" class="row">

            @yield('content')

    </div>

    <footer id="footer-container" class="row">
        @include('includes.footer')
    </footer>

</div>
</body>
</html>