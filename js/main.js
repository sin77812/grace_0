// Grace Speech Main JavaScript

// 페이지 네비게이션 함수들
function goToCorporate() {
    window.location.href = 'corporate/home.html';
}

function goToPersonal() {
    window.location.href = 'personal/home.html';
}

function goToAbout() {
    window.location.href = 'common/about.html';
}

function goToContact() {
    window.location.href = 'common/contact.html';
}

function goToProcess() {
    window.location.href = 'common/process.html';
}

// 모바일 메뉴 토글
function toggleMobileMenu() {
    const overlay = document.getElementById('mobileMenuOverlay');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (overlay.classList.contains('active')) {
        overlay.classList.remove('active');
        overlay.style.display = 'none';
        toggle.style.transform = 'rotate(0deg)';
    } else {
        overlay.classList.add('active');
        overlay.style.display = 'flex';
        toggle.style.transform = 'rotate(90deg)';
    }
}

// 섹션 호버 효과
document.addEventListener('DOMContentLoaded', function() {
    const corporateSection = document.getElementById('corporateSection');
    const personalSection = document.getElementById('personalSection');
    const centerSection = document.querySelector('.landing-center');

    // 마우스 호버시 중앙 이미지 기울기 효과
    corporateSection.addEventListener('mouseenter', function() {
        centerSection.style.transform = 'rotateY(-5deg)';
        centerSection.style.transformOrigin = 'right center';
    });

    personalSection.addEventListener('mouseenter', function() {
        centerSection.style.transform = 'rotateY(5deg)';
        centerSection.style.transformOrigin = 'left center';
    });

    corporateSection.addEventListener('mouseleave', function() {
        centerSection.style.transform = 'rotateY(0deg)';
    });

    personalSection.addEventListener('mouseleave', function() {
        centerSection.style.transform = 'rotateY(0deg)';
    });

    // 클릭시 페이지 전환 애니메이션
    corporateSection.addEventListener('click', function() {
        if (window.innerWidth > 1024) {
            document.body.style.transform = 'translateX(-100%)';
            document.body.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => {
                goToCorporate();
            }, 600);
        } else {
            goToCorporate();
        }
    });

    personalSection.addEventListener('click', function() {
        if (window.innerWidth > 1024) {
            document.body.style.transform = 'translateX(100%)';
            document.body.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => {
                goToPersonal();
            }, 600);
        } else {
            goToPersonal();
        }
    });
});

// 키보드 네비게이션
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowLeft':
            goToCorporate();
            break;
        case 'ArrowRight':
            goToPersonal();
            break;
        case 'Escape':
            if (document.getElementById('mobileMenuOverlay').classList.contains('active')) {
                toggleMobileMenu();
            }
            break;
    }
});

// 부드러운 스크롤 효과 (모바일용)
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// 페이지 로드 애니메이션
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// 반응형 체크 및 적응
function checkResponsive() {
    const width = window.innerWidth;
    const centerSection = document.querySelector('.landing-center');
    
    if (width <= 1024) {
        centerSection.style.transform = 'rotateY(0deg)';
    }
}

window.addEventListener('resize', checkResponsive);

// Grace Speech 타이핑 효과 (선택적)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 페이지 visibility 변경 감지
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // 페이지가 다시 보일 때 애니메이션 재시작
        document.body.style.transform = 'translateX(0)';
    }
});