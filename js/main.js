// Grace Speech Main JavaScript

// 페이지 네비게이션 함수들
function goToCorporate() {
    window.location.href = 'corporate/home.html';
}

function goToPersonal() {
    window.location.href = 'personal/home.html';
}

function goToInstructor() {
    window.location.href = 'personal/instructor.html';
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

// 빠른 상담 모달 관리
function openQuickContact() {
    const modal = document.getElementById('quickContactModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeQuickContact() {
    const modal = document.getElementById('quickContactModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// 스크롤 진행 바
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress .progress-bar');
    if (scrollProgress) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }
}

// 이벤트 리스너
document.addEventListener('scroll', updateScrollProgress);

// 모달 외부 클릭시 닫기
document.addEventListener('click', function(e) {
    const quickContactModal = document.getElementById('quickContactModal');
    
    if (quickContactModal && e.target === quickContactModal) {
        closeQuickContact();
    }
});

// 섹션 클릭 애니메이션
document.addEventListener('DOMContentLoaded', function() {
    const solutionSections = document.querySelectorAll('.solution-section');
    
    solutionSections.forEach(section => {
        section.addEventListener('click', function() {
            // 클릭 효과
            this.style.transform = 'scale(0.98) translateY(-4px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
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