// Grace Speech Corporate JavaScript

// 스크롤 진행률 바
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.progress-bar');
    const scrollTop = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / documentHeight) * 100;
    
    if (scrollProgress) {
        scrollProgress.style.width = scrollPercent + '%';
    }
}

// 부드러운 스크롤 함수들
function scrollToContact() {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
        contactSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToResults() {
    const resultsSection = document.getElementById('results-section');
    if (resultsSection) {
        resultsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 빠른 상담 모달 관리
function openQuickContact() {
    const modal = document.getElementById('quickContactModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // 애니메이션 효과
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
}

function closeQuickContact() {
    const modal = document.getElementById('quickContactModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// 숫자 카운트업 애니메이션
function animateNumbers() {
    const numbers = document.querySelectorAll('.result-number');
    
    numbers.forEach(number => {
        const finalValue = number.textContent;
        const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
        
        if (!isNaN(numericValue)) {
            let current = 0;
            const increment = numericValue / 50; // 50 프레임으로 나누어 증가
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    number.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    const suffix = finalValue.replace(/[0-9]/g, '');
                    number.textContent = Math.floor(current) + suffix;
                }
            }, 30);
        }
    });
}

// Intersection Observer를 이용한 애니메이션 트리거
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // 숫자 애니메이션 트리거
                if (entry.target.classList.contains('results-section')) {
                    setTimeout(animateNumbers, 200);
                }
            }
        });
    }, observerOptions);

    // 관찰할 요소들
    const animateElements = document.querySelectorAll('.why-section, .results-section, .stories-section, .contact-preview');
    animateElements.forEach(el => observer.observe(el));
}

// 폼 제출 처리
function handleContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 수집
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // 로딩 상태
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '전송 중...';
            submitBtn.disabled = true;
            
            // 실제 서버 전송 (여기서는 시뮬레이션)
            setTimeout(() => {
                alert('상담 신청이 완료되었습니다.\n담당자가 24시간 내에 연락드리겠습니다.');
                closeQuickContact();
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// 헤더 스크롤 효과
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(6, 52, 46, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(6, 52, 46, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        // 스크롤 방향에 따른 헤더 숨김/표시
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// 카드 호버 효과 강화
function enhanceCardEffects() {
    const cards = document.querySelectorAll('.why-card, .story-card, .contact-option');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 키보드 네비게이션
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeQuickContact();
        }
        
        // 빠른 액세스 키
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'k':
                    e.preventDefault();
                    openQuickContact();
                    break;
                case 'h':
                    e.preventDefault();
                    window.location.href = '../index.html';
                    break;
            }
        }
    });
}

// 성능 최적화를 위한 스크롤 이벤트 디바운싱
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 기본 기능들 초기화
    setupScrollAnimations();
    handleContactForm();
    handleHeaderScroll();
    enhanceCardEffects();
    setupKeyboardNavigation();
    
    // 스크롤 이벤트 리스너 (디바운싱 적용)
    const debouncedScrollProgress = debounce(updateScrollProgress, 10);
    window.addEventListener('scroll', debouncedScrollProgress);
    
    // 페이지 전환 애니메이션
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 모달 외부 클릭시 닫기
document.addEventListener('click', function(e) {
    const modal = document.getElementById('quickContactModal');
    if (modal && e.target === modal) {
        closeQuickContact();
    }
});

// 윈도우 리사이즈 시 레이아웃 조정
window.addEventListener('resize', debounce(function() {
    // 모바일에서 데스크톱으로 전환시 모달 상태 확인
    if (window.innerWidth > 768) {
        const modal = document.getElementById('quickContactModal');
        if (modal && modal.style.display === 'flex') {
            closeQuickContact();
        }
    }
}, 250));

// 브라우저 뒤로가기/앞으로가기 지원
window.addEventListener('popstate', function() {
    // 페이지 상태 복원
    updateScrollProgress();
});

// 페이지 언로드 시 정리
window.addEventListener('beforeunload', function() {
    // 애니메이션 정리
    document.body.style.transform = 'translateX(-100%)';
});