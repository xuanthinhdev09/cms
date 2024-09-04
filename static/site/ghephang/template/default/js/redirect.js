<script>
        function getMobileOperatingSystem() {
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;

            // iOS detection
            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                return 'iOS';
            }

            // Android detection
            if (/android/i.test(userAgent)) {
                return 'Android';
            }

            return 'unknown';
        }

        window.onload = function() {
            var os = getMobileOperatingSystem();

            if (os === 'iOS') {
                window.location.href = 'https://apps.apple.com/in/app/gh%C3%A9p-h%C3%A0ng/id6476081461'; // Thay bằng link iOS thực tế của bạn
            } else if (os === 'Android') {
                window.location.href = 'https://play.google.com/store/apps/details?id=com.ghephangkhachhang&pcampaignid=web_share'; // Thay bằng link Android thực tế của bạn
            } else {
                window.location.href = 'https://yourwebsite.com'; // Thay bằng link trang web thực tế của bạn
            }
        }
    </script>