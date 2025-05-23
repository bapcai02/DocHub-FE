"use client"

import React from 'react';

const UICatalogPage = () => {

  return (
    <div className="bg-[#070707] text-[#e5e7eb] min-h-screen">
    <header className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 md:px-10 py-4 space-y-3 sm:space-y-0">
    <div className="flex items-center space-x-4 w-full sm:w-auto justify-between">
        <a className="flex items-center space-x-1" href="#">
        <span className="text-[#7c3aed] font-extrabold text-2xl select-none">
        ui
        </span>
        <span className="text-white font-extrabold text-2xl select-none">
        verse
        </span>
        </a>
        <button className="sm:hidden bg-[#1f1f1f] text-white text-sm font-semibold rounded-md px-3 py-1 flex items-center space-x-1 hover:bg-[#2a2a2a] focus:outline-none" aria-expanded="false" aria-haspopup="true">
        <span>
        Elements
        </span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round">
        </path>
        </svg>
        </button>
    </div>
    <nav className="hidden sm:flex space-x-6 text-sm font-semibold w-full sm:w-auto justify-center">
        <a className="flex items-center space-x-1 hover:underline whitespace-nowrap" href="#">
        <span>
        Challenges
        </span>
        <span className="w-2 h-2 rounded-full bg-[#22c55e] inline-block">
        </span>
        </a>
        <a className="hover:underline whitespace-nowrap" href="#">
        Spotlight
        </a>
        <a className="hover:underline whitespace-nowrap" href="#">
        Blog
        </a>
    </nav>
    <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
        <button className="bg-gradient-to-r from-[#a855f7] to-[#7c3aed] text-white text-sm font-semibold rounded-md px-4 py-2 flex items-center space-x-2 hover:brightness-110 focus:outline-none whitespace-nowrap">
        <i className="fas fa-plus">
        </i>
        <span>
        Create
        </span>
        </button>
        <button className="bg-[#1f1f1f] text-white text-sm font-semibold rounded-md px-4 py-2 flex items-center space-x-2 hover:bg-[#2a2a2a] focus:outline-none whitespace-nowrap">
        <i className="fas fa-rocket">
        </i>
        <span>
        Join the Community
        </span>
        </button>
    </div>
    </header>
    <main className="flex flex-col sm:flex-row px-4 sm:px-6 md:px-10 pb-10">
    <aside className="w-full sm:w-48 flex-shrink-0 pr-0 sm:pr-6 mb-6 sm:mb-0">
        <nav className="space-y-3 text-sm font-medium text-[#d4d4d8] flex sm:block overflow-x-auto sm:overflow-visible scrollbar-hide">
        <a className="flex items-center space-x-3 bg-[#1f1f1f] rounded-md px-4 py-2 cursor-pointer select-none whitespace-nowrap" href="#">
        <i className="far fa-book-open text-lg">
        </i>
        <span>
        All
        </span>
        </a>
        <a className="flex items-center space-x-3 hover:text-white cursor-pointer select-none whitespace-nowrap" href="#">
        <i className="far fa-dot-circle text-lg">
        </i>
        <span>
        Buttons
        </span>
        </a>
        <a className="flex items-center space-x-3 hover:text-white cursor-pointer select-none whitespace-nowrap" href="#">
        <i className="fas fa-check-circle text-lg">
        </i>
        <span>
        Checkboxes
        </span>
        </a>
        <a className="flex items-center space-x-3 hover:text-white cursor-pointer select-none whitespace-nowrap" href="#">
        <i className="fas fa-toggle-on text-lg">
        </i>
        <span>
        Toggle switches
        </span>
        </a>
        <a className="flex items-center space-x-3 hover:text-white cursor-pointer select-none whitespace-nowrap" href="#">
        <i className="far fa-clone text-lg">
        </i>
        <span>
        Cards
        </span>
        </a>
        <a className="flex items-center space-x-3 hover:text-white cursor-pointer select-none whitespace-nowrap" href="#">
        <i className="fas fa-sparkles text-lg">
        </i>
        <span>
        Loaders
        </span>
        </a>
        <a className="flex items-center space-x-3 hover:text-white cursor-pointer select-none whitespace-nowrap" href="#">
        <i className="fas fa-keyboard text-lg">
        </i>
        <span>
        Inputs
        </span>
        </a>
        <a className="flex items-center space-x-3 hover:text-white cursor-pointer select-none whitespace-nowrap" href="#">
        <i className="far fa-dot-circle text-lg">
        </i>
        <span>
        Radio buttons
        </span>
        </a>
        <a className="flex items-center space-x-3 hover:text-white cursor-pointer select-none whitespace-nowrap" href="#">
        <i className="far fa-file-alt text-lg">
        </i>
        <span>
        Forms
        </span>
        </a>
        <a className="flex items-center space-x-3 hover:text-white cursor-pointer select-none whitespace-nowrap" href="#">
        <i className="fas fa-pen-nib text-lg">
        </i>
        <span>
        Patterns
        </span>
        </a>
        <a className="flex items-center space-x-3 hover:text-white cursor-pointer select-none whitespace-nowrap" href="#">
        <i className="fas fa-comment-alt text-lg">
        </i>
        <span>
        Tooltips
        </span>
        </a>
        </nav>
    </aside>
    <section className="flex-1 min-w-0">
        <h2 className="text-2xl font-extrabold mb-1 select-none">
        Browse all
        </h2>
        <p className="text-sm text-[#9ca3af] mb-4 select-none">
        Open-Source UI elements made with CSS or Tailwind
        </p>
        <p className="text-xs text-[#9ca3af] mb-3 select-none">
        First page
        </p>
        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        <article className="bg-[#1f1f1f] rounded-md w-[180px] h-[180px] flex items-center justify-center cursor-pointer select-none">
        <span className="text-white font-extrabold text-center text-sm">
        HOVER OVER
        </span>
        </article>
        <article className="bg-[#ededed] rounded-md w-[180px] h-[180px] flex items-center justify-center cursor-pointer">
        <button className="bg-[#7c3aed] text-white text-xs font-semibold rounded-full px-5 py-2 flex items-center space-x-1 hover:brightness-110 focus:outline-none">
        <span>
            Sign up
        </span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round">
            </path>
        </svg>
        </button>
        </article>
        <article className="bg-[#ededed] rounded-md w-[180px] h-[180px] flex items-center justify-center cursor-pointer">
        <form className="w-36">
        <label className="sr-only">
            Search chats
        </label>
        <div className="flex items-center bg-white rounded-md px-3 py-2">
            <i className="fas fa-search text-xs text-[#6b7280]">
            </i>
            <input className="ml-2 text-xs text-[#6b7280] placeholder-[#6b7280] bg-white focus:outline-none w-full" id="search1" placeholder="search your chats" type="text"/>
        </div>
        </form>
        </article>
        <article className="bg-[#ededed] rounded-md w-[180px] h-[180px] flex items-center justify-center cursor-pointer">
        <form className="w-36">
        <label className="sr-only">
            Search
        </label>
        <div className="flex items-center bg-[#f3f4f6] rounded-md px-3 py-2">
            <i className="fas fa-search text-xs text-[#9ca3af]">
            </i>
            <input className="ml-2 text-xs text-[#9ca3af] placeholder-[#9ca3af] bg-[#f3f4f6] focus:outline-none w-full" id="search2" placeholder="Search" type="text"/>
        </div>
        </form>
        </article>
        <article className="bg-[#1f1f1f] rounded-md w-[180px] h-[180px] flex items-center justify-center cursor-pointer">
        <button className="bg-[#3b82f6] text-white text-xs font-semibold rounded-md px-4 py-2 flex items-center space-x-2 hover:brightness-110 focus:outline-none">
        <i className="far fa-bookmark">
        </i>
        <span>
            ADD BOOKMARK
        </span>
        </button>
        </article>
        <article className="bg-[#ededed] rounded-md w-[180px] h-[180px] flex items-center justify-center cursor-pointer">
        <img alt="White letter T with shadow on light gray background" className="select-none" draggable="false" height="80" src="https://storage.googleapis.com/a1aa/image/c07abe73-2304-4130-fa5b-0ea260536b65.jpg" width="80"/>
        </article>
        <article className="bg-[#ededed] rounded-md w-[180px] h-[180px] flex items-center justify-center cursor-pointer">
        <button className="border border-[#e11d48] text-[#e11d48] text-xs font-extrabold rounded-md px-6 py-2 tracking-widest hover:brightness-110 focus:outline-none">
        BUTTON
        </button>
        </article>
        <article className="bg-[#1f1f1f] rounded-md w-[180px] h-[180px] flex items-center justify-center cursor-pointer">
        <div className="w-32 h-40 rounded-2xl bg-[#1f1f1f]">
        </div>
        </article>
        <article className="bg-[#0a0a2a] rounded-md w-[180px] h-[180px] flex items-center justify-center cursor-pointer">
        <img alt="Pattern of navy blue and cream colored triangles forming a geometric design" className="rounded-md select-none" draggable="false" height="180" src="https://storage.googleapis.com/a1aa/image/acd84f1c-488a-4987-8092-e59619e6f68b.jpg" width="180"/>
        </article>
        <article className="bg-[#ededed] rounded-md w-[180px] h-[180px] flex items-center justify-center cursor-pointer">
        <button className="bg-[#2d2d2d] text-white text-xs font-extrabold rounded-md px-6 py-2 shadow-[0_10px_5px_-5px_rgba(168,85,247,0.5)] hover:brightness-110 focus:outline-none">
        HOVER ME
        </button>
        </article>
        <article className="bg-[#ededed] rounded-md w-[180px] h-[180px] flex items-center justify-center cursor-pointer">
        <button className="bg-black text-white text-xs font-extrabold rounded-full px-8 py-2 hover:brightness-110 focus:outline-none">
        BUTTON
        </button>
        </article>
        <article className="bg-[#ededed] rounded-md w-[180px] h-[180px] flex items-center justify-center cursor-pointer">
        <img alt="Yellow hand emoji pointing right with shadow on light gray background" className="select-none" draggable="false" height="120" src="https://storage.googleapis.com/a1aa/image/e8bdb557-23e9-4ae1-802b-b338bf1a3b01.jpg" width="120"/>
        </article>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-6 md:grid-cols-12 gap-x-4 gap-y-1 text-xs text-[#9ca3af] mt-2 select-none max-w-full overflow-x-auto">
        <div className="font-extrabold text-[13px] text-white whitespace-nowrap">
        WhiteNervosa
        </div>
        <div className="flex space-x-3 justify-end whitespace-nowrap">
        <span>
        34K views
        </span>
        <span className="flex items-center space-x-1">
        <i className="far fa-comment">
        </i>
        <span>
            1.3K
        </span>
        </span>
        </div>
        <div className="font-extrabold text-[13px] text-white whitespace-nowrap">
        satyamchaudharydev
        </div>
        <div className="flex space-x-3 justify-end whitespace-nowrap">
        <span>
        29K views
        </span>
        <span className="flex items-center space-x-1">
        <i className="far fa-comment">
        </i>
        <span>
            948
        </span>
        </span>
        </div>
        <div className="font-extrabold text-[13px] text-white whitespace-nowrap">
        satyamchaudharydev
        </div>
        <div className="flex space-x-3 justify-end whitespace-nowrap">
        <span>
        29K views
        </span>
        <span className="flex items-center space-x-1">
        <i className="far fa-comment">
        </i>
        <span>
            352
        </span>
        </span>
        </div>
        <div className="font-extrabold text-[13px] text-white whitespace-nowrap">
        alexruix
        </div>
        <div className="flex space-x-3 justify-end whitespace-nowrap">
        <span>
        42K views
        </span>
        <span className="flex items-center space-x-1">
        <i className="far fa-comment">
        </i>
        <span>
            681
        </span>
        </span>
        </div>
        <div className="font-extrabold text-[13px] text-white whitespace-nowrap">
        Yaya12085
        </div>
        <div className="flex space-x-3 justify-end whitespace-nowrap">
        <span>
        12K views
        </span>
        <span className="flex items-center space-x-1">
        <i className="far fa-comment">
        </i>
        <span>
            195
        </span>
        </span>
        </div>
        <div className="font-extrabold text-[13px] text-white whitespace-nowrap">
        Praashoo7
        </div>
        <div className="flex space-x-3 justify-end whitespace-nowrap">
        <span>
        38K views
        </span>
        <span className="flex items-center space-x-1">
        <i className="far fa-comment">
        </i>
        <span>
            400
        </span>
        </span>
        </div>
        <div className="font-extrabold text-[13px] text-white whitespace-nowrap">
        adamgiebl
        </div>
        <div className="flex space-x-3 justify-end whitespace-nowrap">
        <span>
        20K views
        </span>
        <span className="flex items-center space-x-1">
        <i className="far fa-comment">
        </i>
        <span>
            276
        </span>
        </span>
        </div>
        <div className="font-extrabold text-[13px] text-white whitespace-nowrap">
        Yaseen549
        </div>
        <div className="flex space-x-3 justify-end whitespace-nowrap">
        <span>
        37K views
        </span>
        <span className="flex items-center space-x-1">
        <i className="far fa-comment">
        </i>
        <span>
            1.1K
        </span>
        </span>
        </div>
        <div className="font-extrabold text-[13px] text-white whitespace-nowrap">
        aadium
        </div>
        <div className="flex space-x-3 justify-end whitespace-nowrap">
        <span>
        11K views
        </span>
        <span className="flex items-center space-x-1">
        <i className="far fa-comment">
        </i>
        <span>
            54
        </span>
        </span>
        </div>
        <div className="font-extrabold text-[13px] text-white whitespace-nowrap">
        gharsh11032000
        </div>
        <div className="flex space-x-3 justify-end whitespace-nowrap">
        <span>
        13K views
        </span>
        <span className="flex items-center space-x-1">
        <i className="far fa-comment">
        </i>
        <span>
            317
        </span>
        </span>
        </div>
        <div className="font-extrabold text-[13px] text-white whitespace-nowrap">
        doniaskima
        </div>
        <div className="flex space-x-3 justify-end whitespace-nowrap">
        <span>
        11K views
        </span>
        <span className="flex items-center space-x-1">
        <i className="far fa-comment">
        </i>
        <span>
            310
        </span>
        </span>
        </div>
        <div className="font-extrabold text-[13px] text-white whitespace-nowrap">
        Pradeepsaranbishnoi
        </div>
        <div className="flex space-x-3 justify-end whitespace-nowrap">
        <span>
        41K views
        </span>
        <span className="flex items-center space-x-1">
        <i className="far fa-comment">
        </i>
        <span>
            1.1K
        </span>
        </span>
        </div>
        </div>
        <div className="flex flex-wrap items-center space-x-3 text-xs text-[#9ca3af] mt-6 select-none gap-y-2">
        <span>
        #neumorphism
        </span>
        <span>
        #3d
        </span>
        <span>
        #gradient
        </span>
        <span className="bg-[#1f1f1f] rounded-md px-2 py-1 font-semibold cursor-pointer select-none">
        All
        </span>
        <span className="text-[#22c55e] flex items-center space-x-1 font-semibold cursor-pointer select-none">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12h18M3 6h18M3 18h18" stroke-linecap="round" stroke-linejoin="round">
        </path>
        </svg>
        <span>
        Tailwind
        </span>
        </span>
        <span className="text-[#3b82f6] flex items-center space-x-1 font-semibold cursor-pointer select-none">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12h18M3 6h18M3 18h18" stroke-linecap="round" stroke-linejoin="round">
        </path>
        </svg>
        <span>
        CSS
        </span>
        </span>
        <span className="flex items-center space-x-1 cursor-pointer select-none">
        <i className="fas fa-filter">
        </i>
        <span>
        Sort:
        </span>
        <span className="font-semibold">
        Randomized
        </span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round">
        </path>
        </svg>
        </span>
        <span className="flex items-center space-x-1 cursor-pointer select-none">
        <span>
        Any Theme
        </span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round">
        </path>
        </svg>
        </span>
        <form className="ml-auto w-full max-w-xs">
        <label className="sr-only">
        Search tags, users, posts...
        </label>
        <div className="relative text-gray-400 focus-within:text-gray-600">
        <input className="block w-full rounded-md border border-transparent bg-[#1f1f1f] py-2 pl-10 pr-3 text-xs placeholder-[#6b7280] focus:border-[#7c3aed] focus:bg-[#2a2a2a] focus:outline-none focus:ring-1 focus:ring-[#7c3aed]" id="search-tags" placeholder="Search tags, users, posts..." type="search"/>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <i className="fas fa-search text-xs">
            </i>
        </div>
        </div>
        </form>
        </div>
    </section>
    </main>
    </div>
  );
};

export default UICatalogPage;