"use client"
import Link from "next/link";
import { FaSearch, FaBell } from 'react-icons/fa'
import { useState, useEffect } from 'react';

// return book definition

interface Book {
  id: number,
  title: string,
  genre: string,
  cover: string,
  borrowStatus: string,
  returnDate: string,
  borrowedDate: string,
}

// Sample book data
const books = [
  { id: 1, title: 'Lone Wolf Adventure', genre: 'Adventure', cover: "/lone wolf.png", borrowStatus: 'Returned', returnDate: '2024-10-10', borrowedDate: '2024-09-15' },
  { id: 2, title: 'Robin lee', genre: 'Thriller', cover: "/Robin lee.jpg", borrowStatus: 'Borrowed', returnDate: 'N/A', borrowedDate: '2024-10-01' },
  { id: 3, title: 'Don\'t Look Back', genre: 'Thriller', cover: "/Dont Look.png", borrowStatus: 'Returned', returnDate: '2024-09-30', borrowedDate: '2024-09-10' },
  { id: 4, title: 'Tigers heart', genre: 'Thriller', cover: "/Tigers heart.jpg", borrowStatus: 'Returned', returnDate: '2024-10-12', borrowedDate: '2024-09-18' },
  { id: 5, title: 'Norse Myth', genre: 'Fantasy', cover: "/Norse Myth.jpg", borrowStatus: 'Borrowed', returnDate: 'N/A', borrowedDate: '2024-10-15' },
  { id: 6, title: 'Spring book', genre: 'Romance', cover: "/spring book.jpg", borrowStatus:'Borrowed', returnDate:'2024-10-24', borrowedDate:'2024-08-04'},
]

const dashboardTwos = [
  { id: 1, title: 'Harry Potter', genre: 'Adventure', cover: "/harry potter.jpg", borrowStatus: 'Returned', returnDate: '2024-10-10', borrowedDate: '2024-09-15' },
  { id: 2, title: 'Hide and seek', genre: 'Thriller', cover: "/Hide and seek.jpg", borrowStatus: 'Borrowed', returnDate: 'N/A', borrowedDate: '2024-10-01' },
  { id: 3, title: 'Spring Book', genre: 'Romance', cover: "/spring book.jpg", borrowStatus: 'Returned', returnDate: '2024-09-30', borrowedDate: '2024-09-10' },
  { id: 4, title: 'Lone Wolf Adventure', genre: 'Adventure', cover: "/lone wolf.png", borrowStatus: 'Returned', returnDate: '2024-10-12', borrowedDate: '2024-09-18' },
  { id: 5, title: 'Walk in the shadow', genre: 'Fantasy', cover: "/walk in the shadow.jpg", borrowStatus: 'Borrowed', returnDate: 'N/A', borrowedDate: '2024-10-15' },
  { id: 6, title: 'All This Time', genre: 'Adventure', cover: "/All This Time.png", borrowStatus:'Returned', returnDate: 'N/A', borrowedDate: '2024-10-12'},
]

const dashboardThrees = [
  { id: 1, title: 'All This Time', genre: 'Adventure', cover: "/All This Time.png", borrowStatus: 'Returned', returnDate: '2024-10-10', borrowedDate: '2024-09-15' },
  { id: 2, title: 'Tigers Heart', genre: 'Thriller', cover: "/Tigers heart.jpg", borrowStatus: 'Borrowed', returnDate: 'N/A', borrowedDate: '2024-10-01' },
  { id: 3, title: 'Walk in the shadow', genre: 'Fantasy', cover: "/walk in the shadow.jpg", borrowStatus: 'Returned', returnDate: '2024-09-30', borrowedDate: '2024-09-10' },
  { id: 4, title: 'Robin lee', genre: 'Thriller', cover: "/Robin lee.jpg", borrowStatus: 'Returned', returnDate: '2024-10-12', borrowedDate: '2024-09-18' },
  { id: 5, title: 'Don\'t Look Back', genre: 'Thriller', cover: "/Dont Look.png", borrowStatus: 'Borrowed', returnDate: 'N/A', borrowedDate: '2024-10-15' },
  { id: 6, title: 'Norse Myth', genre: 'Fantasy', cover: "/Norse Myth.jpg", borrowStatus:'Returned', returnDate: 'N/A', borrowedDate: '2024-10-12'},
]

export default function Dashboard() {
  const[selectedGenre, setSelectedGenre] = useState<string>('All');
  const[filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const[searchTerm, setSearchTerm] = useState<string>('');
  
   // Handle search and filtering
  useEffect(() => { 
   const filterData = (bookList: Book[]) =>
    bookList.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
   });


  const combinedFilteredBooks = 
  [...filterData(books), 
   ...filterData(dashboardTwos), 
   ...filterData(dashboardThrees)];
  setFilteredBooks(combinedFilteredBooks);
  }, [searchTerm]);

  // update the filtered books when the genre changes

  useEffect(() => {
    if(selectedGenre === 'All'){
      setFilteredBooks(books);
    }
    else {
      const filteredBooks = books.filter((book) => book.genre === selectedGenre);
      setFilteredBooks(filteredBooks);
    }
  }, [selectedGenre])


  // handle search and filtering 
  
  return (
    <div className="w-[1,512px] h-[85px] relative [-1px] border pt-[16px] pr-[36px] pb-[16px] pl-[36px]">
        <div className="w-[241px] h-[53px]">
              <h1 className="font-sans text-[32px] font-bold leading-[52.79px]">
                BookaThon 
              </h1>
        </div>

        <div className="w-[1,062px] h-[53px] flex justify-between relative bottom-[35px] font-sans left-[320px]">
            <div className="w-[238px] h-[25px]">
              <div className="w-[67px] h-[25px] cursor-pointer hover:text-blue-400">
              {/* Library Link */}
            <Link href="/homepage" className="hover:text-blue-500 cursor-pointer font-semibold text-[14px] leading-[25.14px]">
              Library
            </Link>

             <div className="w-[83px] cursor-pointer h-[25px] font-sans relative bottom-[25px] left-[100px]">
             {/*My Shelf Link */}
             <Link href="/dashboard" className="text-[14px] text-[#0661E8] font-semibold leading-[25.14px]">
             My Shelf
             </Link>
             </div>

            <div className="w-[17.88px] h-[21.81px] relative bottom-[48px] left-[900px]">
             <FaBell className='text-xl text-gray-700 cursor-pointer hover:text-blue-500'>
              </FaBell>  
              <img 
               src='/user-avatar.jpg'
               alt="Avatar"
               className="rounded-full cursor-pointer relative left-[50px] w-[64px] h-[20px] bottom-[19px]"
               />
            </div>     
             </div>
            </div>
        </div>

      {/*Search input */}
        <div className="w-[992px] h-[66px] flex rounded-md justify-between p-8">
          <div className="relative">
            <input 
            type="text"
            value={searchTerm} 
            className="border p-6 font-sans w-[512px] h-[66px] bottom-[25px] right-[35px] relative rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"      
            placeholder="Type book name or author"
            onChange={(e) => setSearchTerm(e.target.value)}
            />
          
           {/* Search Icon */}
           
      <FaSearch 
      className="text-gray-500 w-3 h-6 relative bottom-[70px] left-[440px] cursor-pointer" 
      />

        <div className="w-[195px] h-[40px] top-[135px] left-[80px]">
          <p className="w-[400px] font-semibold font-sans text-[22px] leading-[40.22px]">
            Returned Rentals 
          </p>

        {/*Header page- Genre, borrowed status, return date and date borrowed */}
       
        {/* Dropdown */}

      <div className="mt-6 flex items-center gap-2 relative font-extralight bottom-[160px] left-[500px]">
        <h2 className="font-extralight">Sort by:</h2>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="p-2 cursor-pointer border rounded-md"
        >
          <option value="All">Genre</option>
          <option value="Adventure">Adventure</option>
          <option value="Drama">Drama</option>
          <option value="Thriller">Thriller</option>
          <option value="Romance">Romance</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Business">Business</option>
        </select>
      </div>

        {/* Borrowal List */}

        <div className="mt-6 flex items-center gap-2 relative font-extralight bottom-[220px] left-[730px]">
        
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="p-2 cursor-pointer border rounded-md"
        >
          <option value="All">Borrowal Status</option>
        </select>
      </div>

    {/* Return Date */}
     
    <div className="mt-6 flex items-center gap-2 relative font-extralight bottom-[280px] left-[950px]">
        
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="p-2 cursor-pointer border rounded-md"
        >
          <option value="All">Return Date</option>
        </select>
      </div>
     
    {/* Date Borrowed */}

    <div className="mt-6 flex items-center gap-2 relative font-extralight bottom-[340px] left-[1110px]">
        
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="p-2 cursor-pointer border rounded-md"
        >
          <option value="All">Date Borrowed</option>
        </select>
      </div>
    


      {/* Book List */}
      {/*First row */}

      <div className="grid w-[1297px] h-[209px]">
      <div className="flex gap-8 relative font-sans bottom-[200px]">
        {filteredBooks.map((book) => (
          <div key={book.id} className="p-8 rounded-md">
            <img 
              src={book.cover}
              alt={book.title}
              className="rounded-md w-full h-[120px] cursor-pointer"
            />
          </div>       
        ))}
      </div>

      {/*second row */}
      <div className="grid w-[1297px] h-[209px]">
      <div className="flex gap-8 relative font-sans bottom-[200px]">
        {dashboardTwos.map((book) => (
          <div key={book.id} className="p-8 rounded-md">
            <img 
              src={book.cover}
              alt={book.title}
              className="rounded-md w-full h-[120px] cursor-pointer"
            />
          </div>       
        ))}
      </div>

      {/*Third row */}
      <div className="grid w-[1297px] h-[209px]">
      <div className="flex gap-8 relative font-sans bottom-[200px]">
        {dashboardThrees.map((book) => (
          <div key={book.id} className="p-8 rounded-md">
            <img 
              src={book.cover}
              alt={book.title}
              className="rounded-md w-full h-[120px] cursor-pointer"
            />
          </div>
     ))}
      </div>
  
      </div>
    </div>

        </div>
     
        </div>
  </div>
  </div>
</div>
  );
}
