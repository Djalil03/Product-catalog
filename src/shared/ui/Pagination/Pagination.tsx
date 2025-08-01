import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange, className = '' }) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
  const delta = 2; // Количество страниц слева и справа от текущей
  const range: any = [];
  const rangeWithDots: any = [];

  // Определяем диапазон видимых страниц
  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    range.push(i);
  }

  // Добавляем первую страницу
  if (currentPage - delta > 2) {
    rangeWithDots.push(1, '...');
  } else {
    rangeWithDots.push(1);
  }

  // Добавляем диапазон страниц
  rangeWithDots.push(...range);

  // Добавляем последнюю страницу
  if (currentPage + delta < totalPages - 1) {
    rangeWithDots.push('...', totalPages);
  } else if (totalPages > 1) {
    rangeWithDots.push(totalPages);
  }

  return rangeWithDots;
};

const visiblePages = getVisiblePages();

const handlePageClick = (page) => {
  if (page !== '...' && page !== currentPage) {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

  return (
      <div className={`flex items-center justify-center ${className}`} >
          <div className="flex items-center space-x-1">
          <button
              className='flex cursor-pointer'
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
          >
              <ChevronLeft/>
              <span>Назад</span>
          </button>
          {visiblePages.map((page, idx) => (
              <div key={idx}>
                  {page === '...' ? (
                      <span>
                          <MoreHorizontal />
                      </span>
                  ) : (
                      <button 
                          onClick={() => handlePageClick(page)}
                          className={`
                              relative inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
                              ${page === currentPage
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-900 shadow-sm border border-gray-300 hover:shadow-md'
                              }
                          `}
                      >
                          {page}
                      </button>
                  )}
              </div>
          ))}
          <button
              className='flex cursor-pointer'
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages}
          >
              <span>Вперед</span>
              <ChevronRight />
          </button>
          </div>
      </div>
  )
}

export default Pagination
