<template>
    <div class="bg-white">
        <div v-if="loading" class="page-loader">
            <!-- You can use a loading spinner or any other loading animation here -->
            <img src="../../assets/images/loader/pepsagif.png" alt="" class="animate__heartBeat animate__infinite animate__animated">
        </div>
        <div class="header sticky top-0 left-0 right-0 bg-white pl-[17px] pr-[18px] pt-3 pb-[13px] justify-center items-center flex" style="box-shadow: 0px 4px 4px 0px #00000040;">
            <div class="w-[15%] flex justify-start"> 
                <div @click="closeModal()">
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_2554_32077)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.65172 10.1909L6.0896 12.6288C6.18079 12.7138 6.25392 12.8162 6.30465 12.9301C6.35538 13.0439 6.38266 13.1668 6.38485 13.2914C6.38705 13.4161 6.36413 13.5398 6.31745 13.6554C6.27077 13.771 6.20129 13.876 6.11316 13.9641C6.02502 14.0522 5.92004 14.1217 5.80447 14.1684C5.68891 14.2151 5.56512 14.238 5.4405 14.2358C5.31588 14.2336 5.19298 14.2063 5.07913 14.1556C4.96528 14.1049 4.86282 14.0317 4.77785 13.9405L0.755973 9.91866L0.100098 9.26279L0.755973 8.60691L4.77785 4.58504C4.95379 4.42109 5.1865 4.33184 5.42694 4.33608C5.66739 4.34032 5.89681 4.43773 6.06685 4.60778C6.2369 4.77783 6.33431 5.00724 6.33855 5.24769C6.34279 5.48814 6.25354 5.72084 6.0896 5.89679L3.65172 8.33466H15.8782C16.9449 8.33466 17.9679 8.75839 18.7221 9.51264C19.4764 10.2669 19.9001 11.2899 19.9001 12.3565C19.9001 13.4232 19.4764 14.4462 18.7221 15.2004C17.9679 15.9547 16.9449 16.3784 15.8782 16.3784H13.4032C13.1571 16.3784 12.921 16.2806 12.7469 16.1066C12.5729 15.9325 12.4751 15.6964 12.4751 15.4503C12.4751 15.2041 12.5729 14.9681 12.7469 14.794C12.921 14.6199 13.1571 14.5222 13.4032 14.5222H15.8782C16.4526 14.5222 17.0034 14.294 17.4095 13.8879C17.8157 13.4817 18.0438 12.9309 18.0438 12.3565C18.0438 11.7822 17.8157 11.2313 17.4095 10.8252C17.0034 10.4191 16.4526 10.1909 15.8782 10.1909H3.65172Z" fill="#383838"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_2554_32077">
                            <rect width="19.8" height="19.8" fill="white" transform="translate(0.100098 0.600098)"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                
            </div>
            <div class="w-[85%] flex justify-center">
                <div class="w-full flex items-center justify-center">
                    <div class="w-[20%]">
                        <img v-if="vendorlogo == '' || vendorlogo == null" src="../../assets/images/default_logo.png" alt="" class="w-full h-full rounded-full">
                        <img v-else :src="`${vendorlogo}`" alt="" class="w-full h-full rounded-full">
                    </div>
                    <div class="w-[80%] grid justify-start">
                        <span class="font-semibold text-center"> {{vendorname}} </span>
                        <span class="text-[12px] text-center"> {{vendorphone}} </span>
                    </div>
                </div>
            </div>
        
        </div>
      
        <div class="relative top-0 left-0 right-0 mx-auto px-3 mt-6">
            <div class="font-bold font-poppins text-[#3A3A3A]">Order Details</div>
            <div class="bg-[#FDF8F8] rounded flex w-full justify-center items-center my-4 p-3">
                <span class="text-wine text-[12px] w-[15%]">icon</span>
                <span class="grid  w-[60%] justify-center">
                        <span class="text-[12px] text-[#111111]">Delivery Number: {{orderNo}}</span>
                        <span class="text-[10px] text-[#77869E] ">{{ $format_date(created_at) }}</span>
                </span>
                <span class="text-wine flex justify-end text-[12px] w-[25%] capitalize">{{orderstatus}}</span>
            </div>
            <Accordion title="Order and Item Details" :defaultOpen="true">
                <div class="flex px-2">
                    <div class="w-[50%] flex items-center">
                        <span class="pr-[2px]"> <ClockIcon class="w-4 h-4 text-wine" /> </span>
                        <span class="font-poppins text-[12px] font-light ">{{distance}}</span>
                    </div>
                    <div class="w-[50%] flex items-center justify-end">
                        <span class="pr-[5px]">
                            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_2554_21061)">
                                <path d="M5.19307 4.89844C4.45046 4.89844 3.73827 5.19344 3.21317 5.71854C2.68807 6.24364 2.39307 6.95583 2.39307 7.69844C2.39307 8.44104 2.68807 9.15323 3.21317 9.67834C3.73827 10.2034 4.45046 10.4984 5.19307 10.4984C5.93567 10.4984 6.64786 10.2034 7.17297 9.67834C7.69807 9.15323 7.99307 8.44104 7.99307 7.69844C7.99307 6.95583 7.69807 6.24364 7.17297 5.71854C6.64786 5.19344 5.93567 4.89844 5.19307 4.89844ZM6.06163 5.47076C6.12326 5.47125 6.18366 5.488 6.23674 5.51932C6.28982 5.55065 6.33368 5.59543 6.3639 5.64914C6.39411 5.70286 6.40961 5.7636 6.40882 5.82522C6.40803 5.88685 6.39099 5.94717 6.35941 6.0001L5.39341 7.67338L6.40799 8.32746C6.44662 8.35236 6.47998 8.38463 6.50614 8.42242C6.53231 8.46021 6.55077 8.50279 6.56048 8.54772C6.57019 8.59265 6.57096 8.63905 6.56274 8.68427C6.55452 8.7295 6.53747 8.77266 6.51257 8.8113C6.48766 8.84993 6.4554 8.88329 6.4176 8.90945C6.37981 8.93562 6.33723 8.95408 6.29231 8.96379C6.24738 8.97351 6.20098 8.97427 6.15575 8.96605C6.11053 8.95783 6.06736 8.94078 6.02873 8.91588L4.73373 8.08134C4.65819 8.03264 4.60427 7.95674 4.58316 7.86938C4.56205 7.78202 4.57536 7.68988 4.62033 7.61206L5.75307 5.6501C5.7837 5.5953 5.82851 5.54975 5.8828 5.51822C5.93708 5.4867 5.99885 5.47021 6.06163 5.47076Z" fill="#AAAAAA"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.85322 0.700211C0.806987 0.699786 0.761128 0.708525 0.718292 0.725924C0.675455 0.743322 0.636491 0.769036 0.603648 0.801578C0.570806 0.834121 0.544737 0.872849 0.526947 0.915524C0.509157 0.958199 0.499998 1.00398 0.5 1.05021L0.5 10.8908C0.500011 10.9575 0.519085 11.0228 0.554976 11.0791C0.590867 11.1353 0.642079 11.1801 0.70258 11.2082L5.13582 13.2676C5.18303 13.2895 5.23454 13.3007 5.2866 13.3002C5.33652 13.2998 5.38579 13.2887 5.43108 13.2677L9.7169 11.2768L14.0027 13.2676C14.056 13.2923 14.1147 13.3032 14.1734 13.2993C14.232 13.2954 14.2888 13.2767 14.3383 13.2451C14.3878 13.2135 14.4286 13.1699 14.4569 13.1184C14.4852 13.0668 14.5 13.009 14.5 12.9502V3.10961C14.5 3.0429 14.4809 2.97759 14.445 2.92136C14.4091 2.86513 14.3579 2.82033 14.2974 2.79223L9.86418 0.732831C9.81693 0.710859 9.76537 0.699714 9.71326 0.700211C9.66343 0.700649 9.61427 0.711722 9.56906 0.732691L5.28324 2.72363L0.99742 0.732831C0.952224 0.711814 0.903061 0.700693 0.85322 0.700211ZM9.87314 1.50871L13.8 3.33291V12.4017L9.92508 10.6017L9.87314 1.50871ZM9.45342 1.55827L9.50522 10.603L5.49044 12.4682L5.48176 10.9463C5.34204 10.9572 5.20176 10.9589 5.06176 10.9509L5.07044 12.4654L1.2 10.6672V1.59873L5.0185 3.37253L5.0248 4.47965C5.16531 4.47865 5.30572 4.48717 5.44508 4.50513L5.43878 3.42335L9.45342 1.55827Z" fill="#AAAAAA"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_2554_21061">
                                <rect width="14" height="14" fill="9D0208" transform="translate(0.5)"/>
                                </clipPath>
                            </defs>
                            </svg>
                        </span>
                        <span  class="font-poppins text-[12px] font-light ">{{time}}</span>
                    </div>
                </div>
                <div class="flex  mt-2  px-2">
                    <div class="w-[50%] flex items-center">
                        <span class="pr-[5px]">
                            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.3332 6.37027L11.7348 5.44277C13.2748 4.13027 11.729 1.68027 9.87984 2.51444L9.37234 2.73027L9.30817 2.17027C9.24984 1.54027 8.92317 1.09111 8.4915 0.828605C7.53484 0.272688 6.0765 0.653605 5.84317 2.04194L4.239 1.12027C3.679 0.793605 2.96734 0.986105 2.6465 1.54611L2.06317 2.55527C1.89984 2.83527 1.999 3.1911 2.279 3.35444L6.82317 5.97944L7.69817 4.46277L8.70734 5.0461L7.83234 6.56277L12.3765 9.18777C12.6565 9.3336 13.0182 9.25194 13.1757 8.97194L13.759 7.96277C14.0798 7.40277 13.8932 6.69111 13.3332 6.37027ZM7.71567 2.91694C7.20817 3.06277 6.79984 2.52027 7.0565 2.07111C7.20817 1.79111 7.57567 1.69777 7.85567 1.85527C8.30484 2.11777 8.21734 2.79444 7.71567 2.91694ZM10.7432 4.66694C10.2415 4.81277 9.83317 4.27027 10.0898 3.82111C10.2473 3.54111 10.609 3.44777 10.8832 3.60527C11.3323 3.86777 11.2448 4.54444 10.7432 4.66694ZM12.674 9.84694C12.9132 9.84694 13.1407 9.76527 13.3332 9.62527V11.6669C13.3332 12.3144 12.814 12.8336 12.1665 12.8336H2.83317C2.52375 12.8336 2.22701 12.7107 2.00821 12.4919C1.78942 12.2731 1.6665 11.9764 1.6665 11.6669V6.41694H6.42067L6.9165 6.70861V11.6669H8.08317V7.37944L12.0907 9.68944C12.2657 9.79444 12.4582 9.84694 12.674 9.84694Z" fill="#AAAAAA"/>
                            </svg>
                        </span>
                        <span  class="font-poppins text-[12px] font-light ">{{itemCategory}}</span>
                        
                    </div>
                    <div class="w-[50%] flex items-center  justify-end">
                        <span class="pr-[5px]">
                            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.20768 7.21886C6.51976 7.54261 6.6831 7.63595 6.9806 7.62428L7.01268 6.89511H7.4706M4.37018 6.39636H5.88393C5.92185 5.75178 6.21935 5.30553 6.99226 5.2297L7.01268 5.89761H7.4706M2.72518 8.9222C2.72518 8.9222 1.92018 8.94845 1.88226 8.65386C1.78034 7.75876 1.79013 6.85446 1.91143 5.96178C1.98435 5.36095 3.05476 5.29095 3.34351 4.75136C3.45726 4.53553 3.20935 4.1447 3.41351 4.13886C4.66185 4.0922 5.87226 3.87636 6.7356 3.94053C7.49584 3.9865 8.23308 4.21889 8.88226 4.6172C9.6056 5.04886 10.1918 5.53011 10.8773 5.89761C11.6123 6.29428 12.5018 6.37303 13.0414 7.00011C13.2543 7.25678 13.2514 8.69761 13.0035 8.82303C12.6308 8.95967 12.2306 9.00468 11.8368 8.95428M5.06143 8.9222H7.42101M11.8048 8.9222C11.8048 9.1489 11.7375 9.37052 11.6116 9.55902C11.4856 9.74752 11.3066 9.89444 11.0972 9.98119C10.8877 10.068 10.6572 10.0906 10.4349 10.0464C10.2125 10.0022 10.0083 9.89302 9.84799 9.73272C9.68769 9.57241 9.57852 9.36817 9.53429 9.14582C9.49006 8.92347 9.51276 8.693 9.59952 8.48355C9.68627 8.2741 9.83319 8.09508 10.0217 7.96912C10.2102 7.84317 10.4318 7.77595 10.6585 7.77595C10.9605 7.77979 11.2487 7.90265 11.4606 8.11783C11.6726 8.333 11.791 8.62311 11.7902 8.92511L11.8048 8.9222ZM5.04393 8.9222C5.04393 9.1489 4.9767 9.37052 4.85075 9.55902C4.7248 9.74752 4.54578 9.89444 4.33633 9.98119C4.12688 10.068 3.89641 10.0906 3.67406 10.0464C3.45171 10.0022 3.24747 9.89302 3.08716 9.73272C2.92685 9.57241 2.81768 9.36817 2.77346 9.14582C2.72923 8.92347 2.75193 8.693 2.83868 8.48355C2.92544 8.2741 3.07236 8.09508 3.26086 7.96912C3.44936 7.84317 3.67097 7.77595 3.89768 7.77595C4.19915 7.77978 4.48697 7.90224 4.69879 8.11679C4.91061 8.33134 5.02937 8.6207 5.02935 8.9222H5.04393Z" stroke="#AAAAAA" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                        <span  class="font-poppins text-[12px] font-light ">{{deliverymethod}}</span>
                    </div>
                </div>
               
            <a href="#" class=" font-poppins text-blue-600 text-[10px] mt-3 flex items-center gap-1">
                <LinkIcon class="w-4 h-4" /> View more detail about your order
            </a>
            </Accordion>
            <Accordion title="Delivery and Pickup">
                <div class="grid border-b pt-[7px] pl-[12px] pb-[18px] pr-[12px] border-[#F3F3F3]">
                    <div class="my-[10px] flex bg-white w-full">
                        <span class="w-[15%]">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.9702 22C17.4931 22 21.9702 17.5228 21.9702 12C21.9702 6.47715 17.4931 2 11.9702 2C6.44737 2 1.97021 6.47715 1.97021 12C1.97021 17.5228 6.44737 22 11.9702 22Z" stroke="#9D0208" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 16.2295C14.3362 16.2295 16.23 14.3357 16.23 11.9995C16.23 9.66337 14.3362 7.76953 12 7.76953C9.66386 7.76953 7.77002 9.66337 7.77002 11.9995C7.77002 14.3357 9.66386 16.2295 12 16.2295Z" fill="#9D0208" stroke="#9D0208" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                        <span class="w-[85%] text-[#383838] text-[12px] font-poppins font-light">{{pAddress}},{{ pLocation }}</span> 
                    </div>
                    <div class="flex w-full">
                        <div class="w-[70%] grid items-center">
                            <span class="font-poppins text-[14px] font-medium leading-[130%]">{{pName}}</span>
                        </div>
                        <div class="w-[30%] flex items-center justify-end">
                            <a v-if="orderstatus == 'paired' || orderstatus == 'pickedup'" :href="`tel:${pPhone}`" class="w-[50%]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z" fill="#191D31"/>
                                </svg>
                            </a>
                            <button v-if="orderstatus == 'paired'" type="button" class="pr-3" @click="ConfirmPickup">
                                <svg width="24" height="24" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.6023 5.8725C11.1613 4.73162 10.3956 3.74498 9.39989 3.03453C8.4042 2.32408 7.22215 1.92096 5.99984 1.875C4.77753 1.92096 3.59549 2.32408 2.59979 3.03453C1.6041 3.74498 0.838401 4.73162 0.39734 5.8725C0.367553 5.95489 0.367553 6.04511 0.39734 6.1275C0.838401 7.26838 1.6041 8.25502 2.59979 8.96547C3.59549 9.67592 4.77753 10.079 5.99984 10.125C7.22215 10.079 8.4042 9.67592 9.39989 8.96547C10.3956 8.25502 11.1613 7.26838 11.6023 6.1275C11.6321 6.04511 11.6321 5.95489 11.6023 5.8725ZM5.99984 9.375C4.01234 9.375 1.91234 7.90125 1.15109 6C1.91234 4.09875 4.01234 2.625 5.99984 2.625C7.98734 2.625 10.0873 4.09875 10.8486 6C10.0873 7.90125 7.98734 9.375 5.99984 9.375Z" fill="black"/>
                                    <path d="M6 3.75C5.55499 3.75 5.11998 3.88196 4.74997 4.12919C4.37996 4.37643 4.09157 4.72783 3.92127 5.13896C3.75097 5.5501 3.70642 6.0025 3.79323 6.43895C3.88005 6.87541 4.09434 7.27632 4.40901 7.59099C4.72368 7.90566 5.12459 8.11995 5.56105 8.20677C5.99751 8.29358 6.4499 8.24903 6.86104 8.07873C7.27217 7.90843 7.62357 7.62004 7.87081 7.25003C8.11804 6.88002 8.25 6.44501 8.25 6C8.25 5.40326 8.01295 4.83097 7.59099 4.40901C7.16903 3.98705 6.59674 3.75 6 3.75ZM6 7.5C5.70333 7.5 5.41332 7.41203 5.16665 7.2472C4.91997 7.08238 4.72771 6.84811 4.61418 6.57403C4.50065 6.29994 4.47095 5.99834 4.52882 5.70736C4.5867 5.41639 4.72956 5.14912 4.93934 4.93934C5.14912 4.72956 5.41639 4.5867 5.70737 4.52882C5.99834 4.47094 6.29994 4.50065 6.57403 4.61418C6.84812 4.72771 7.08238 4.91997 7.24721 5.16664C7.41203 5.41332 7.5 5.70333 7.5 6C7.5 6.39782 7.34197 6.77936 7.06066 7.06066C6.77936 7.34196 6.39783 7.5 6 7.5Z" fill="black"/>
                                </svg>
                            </button>
                            <button v-if="orderstatus == 'paired'" type="button" class="" @click="SharePicuupLink()">
                                <svg width="24" height="24" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 6L7.5 2.5V4.5C4 5 2.5 7.5 2 10C3.25 8.25 5 7.45 7.5 7.45V9.5L11 6Z" fill="black"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <ConfirmPickupCode @Close="closeConfirm" v-if="IsConfirmPickup" :orderNo="order_no"/>
                </div>
                <div class="grid border-b pt-[7px] pl-[12px] pb-[18px] pr-[12px] border-[#F3F3F3]">
                    <div class="my-[10px] flex bg-white w-full">
                        <span class="w-[15%]">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.6201 8.45C19.5701 3.83 15.5401 1.75 12.0001 1.75C12.0001 1.75 12.0001 1.75 11.9901 1.75C8.4601 1.75 4.4201 3.82 3.3701 8.44C2.2001 13.6 5.3601 17.97 8.2201 20.72C9.2801 21.74 10.6401 22.25 12.0001 22.25C13.3601 22.25 14.7201 21.74 15.7701 20.72C18.6301 17.97 21.7901 13.61 20.6201 8.45ZM12.0001 13.46C10.2601 13.46 8.8501 12.05 8.8501 10.31C8.8501 8.57 10.2601 7.16 12.0001 7.16C13.7401 7.16 15.1501 8.57 15.1501 10.31C15.1501 12.05 13.7401 13.46 12.0001 13.46Z" fill="#1D272F"/>
                            </svg>
                        </span>
                        <span class="w-[85%] text-[#383838] text-[12px] font-poppins font-light">{{ dAddress}},{{ dLocation }}</span> 
                    </div>
                    <div class="flex w-full">
                        <div class="w-[70%] grid items-center">
                            <span class="font-poppins text-[14px] font-medium leading-[130%]">{{ dName}}</span>
                        </div>
                        <div class="w-[30%] flex items-center justify-end">
                            <a v-if="orderstatus == 'paired' || orderstatus == 'pickedup'" :href="`tel:${dPhone}`" class="pr-3 w-[50%]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z" fill="#191D31"/>
                                </svg>
                            </a>
                            <button v-if="orderstatus == 'pickedup'" type="button" class="pr-3" @click="GenerateReceiverCode()">
                                <svg width="24" height="24" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.6023 5.8725C11.1613 4.73162 10.3956 3.74498 9.39989 3.03453C8.4042 2.32408 7.22215 1.92096 5.99984 1.875C4.77753 1.92096 3.59549 2.32408 2.59979 3.03453C1.6041 3.74498 0.838401 4.73162 0.39734 5.8725C0.367553 5.95489 0.367553 6.04511 0.39734 6.1275C0.838401 7.26838 1.6041 8.25502 2.59979 8.96547C3.59549 9.67592 4.77753 10.079 5.99984 10.125C7.22215 10.079 8.4042 9.67592 9.39989 8.96547C10.3956 8.25502 11.1613 7.26838 11.6023 6.1275C11.6321 6.04511 11.6321 5.95489 11.6023 5.8725ZM5.99984 9.375C4.01234 9.375 1.91234 7.90125 1.15109 6C1.91234 4.09875 4.01234 2.625 5.99984 2.625C7.98734 2.625 10.0873 4.09875 10.8486 6C10.0873 7.90125 7.98734 9.375 5.99984 9.375Z" fill="black"/>
                                    <path d="M6 3.75C5.55499 3.75 5.11998 3.88196 4.74997 4.12919C4.37996 4.37643 4.09157 4.72783 3.92127 5.13896C3.75097 5.5501 3.70642 6.0025 3.79323 6.43895C3.88005 6.87541 4.09434 7.27632 4.40901 7.59099C4.72368 7.90566 5.12459 8.11995 5.56105 8.20677C5.99751 8.29358 6.4499 8.24903 6.86104 8.07873C7.27217 7.90843 7.62357 7.62004 7.87081 7.25003C8.11804 6.88002 8.25 6.44501 8.25 6C8.25 5.40326 8.01295 4.83097 7.59099 4.40901C7.16903 3.98705 6.59674 3.75 6 3.75ZM6 7.5C5.70333 7.5 5.41332 7.41203 5.16665 7.2472C4.91997 7.08238 4.72771 6.84811 4.61418 6.57403C4.50065 6.29994 4.47095 5.99834 4.52882 5.70736C4.5867 5.41639 4.72956 5.14912 4.93934 4.93934C5.14912 4.72956 5.41639 4.5867 5.70737 4.52882C5.99834 4.47094 6.29994 4.50065 6.57403 4.61418C6.84812 4.72771 7.08238 4.91997 7.24721 5.16664C7.41203 5.41332 7.5 5.70333 7.5 6C7.5 6.39782 7.34197 6.77936 7.06066 7.06066C6.77936 7.34196 6.39783 7.5 6 7.5Z" fill="black"/>
                                </svg>
                            </button>
                            <button v-if="orderstatus == 'pickedup'"  type="button" class="" @click="ShareReceiverCode()">
                                <svg width="24" height="24" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 6L7.5 2.5V4.5C4 5 2.5 7.5 2 10C3.25 8.25 5 7.45 7.5 7.45V9.5L11 6Z" fill="black"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <ReceiverDeliveryCode @CloseReceiver="handlecloseReceiver" v-if="IsConfirmReceiver" :custToken="receivertoken" />
                </div>
            </Accordion>
            
            <Accordion title="Order Report">
                <div class="bg-[#FFEBEB] rounded py-4 px-2 grid" v-if="orderstatus == 'pending'">
                    <div class="mb-3 flex w-full ">
                        <span class="w-[60%] font-poppins text-[#000000] text-[14px]" >Request Sent</span>
                        <span class="w-[40%] text-[#111111] text-[10px]">{{ $format_date(updated_at) }}</span>
                    </div>
                    <div class="text-[#111111] font-poppins text-[12px]">
                        📦 {{activity}}
                    </div>
                </div>
                <div class="bg-[#FFEBEB] rounded py-4 px-2 grid" v-if="orderstatus === 'paired'">
                    <div class="mb-3 flex w-full ">
                        <span class="w-[60%] font-poppins text-[#000000] text-[14px]" >Order Paired</span>
                        <span class="w-[40%] text-[#111111] text-[10px]">{{ $format_date(updated_at) }}</span>
                    </div>
                    <div class="grid border-b pt-[7px] pl-[21px] pb-[18px] pr-[21px] border-[#F3F3F3]" v-if="rider">
               
                        <div class="flex items-center">
                            <div class="w-[20%]">
                                <img src="../../assets/images/default_logo.png" alt="" class="w-full h-full rounded-full">
                            </div>
                            <div class="w-[80%] grid items-center pl-2">
                                <span class="font-poppins text-[14px] font-medium leading-[130%]">{{riderName}}</span>
                                <span class="flex">
                                    <span class="font-poppins text-[#4A4A4A] text-[12px] font-light">{{ridervehModel}} - {{ridervehPlateno}}</span> 
                                    <span class="">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.00789 1.04949L8.03456 3.10283C8.17456 3.38866 8.54789 3.66283 8.86289 3.71533L10.7237 4.02449C11.9137 4.22283 12.1937 5.08616 11.3362 5.93783L9.88956 7.38449C9.64456 7.62949 9.51039 8.10199 9.58623 8.44033L10.0004 10.2312C10.3271 11.6487 9.57456 12.197 8.32039 11.4562L6.57623 10.4237C6.26123 10.237 5.74206 10.237 5.42123 10.4237L3.67706 11.4562C2.42873 12.197 1.67039 11.6428 1.99706 10.2312L2.41123 8.44033C2.48706 8.10199 2.35289 7.62949 2.10789 7.38449L0.661226 5.93783C-0.19044 5.08616 0.0837264 4.22283 1.27373 4.02449L3.13456 3.71533C3.44373 3.66283 3.81706 3.38866 3.95706 3.10283L4.98373 1.04949C5.54373 -0.0646745 6.45373 -0.0646745 7.00789 1.04949Z" fill="#FD683D"/>
                                        </svg>
                                    </span>
                                    <span class="font-josefin text-[#A7A9B7] text-[12px] font-light">4.9</span>
                                </span>
                            </div>
                            <div class="" v-if="orderstatus != 'delivered'">
                                <div class="w-[20%] flex items-center pr-2">
                                    <span class="w-[50%]">
                                        <a :href="`tel:${riderPhone}`" class="">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z" fill="#191D31"/>
                                            </svg>
                                        </a>
                                    </span>
                                    <span class="w-[50%]">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 6.75C21.5188 6.75 22.75 5.51878 22.75 4C22.75 2.48122 21.5188 1.25 20 1.25C18.4812 1.25 17.25 2.48122 17.25 4C17.25 5.51878 18.4812 6.75 20 6.75Z" fill="#E50000"/>
                                            <path d="M19.04 8.15C17.47 7.81 16.19 6.53 15.85 4.96C15.72 4.35 15.71 3.76 15.82 3.2C15.95 2.58 15.49 2 14.85 2H7C4.24 2 2 4.24 2 7V13.95C2 16.71 4.24 18.95 7 18.95H8.5C8.78 18.95 9.14 19.13 9.3 19.35L10.8 21.34C11.46 22.22 12.54 22.22 13.2 21.34L14.7 19.35C14.89 19.1 15.18 18.95 15.5 18.95H17.01C19.77 18.95 22 16.72 22 13.96V9.15C22 8.52 21.42 8.06 20.8 8.18C20.24 8.28 19.65 8.28 19.04 8.15ZM8 12C7.44 12 7 11.55 7 11C7 10.45 7.44 10 8 10C8.55 10 9 10.45 9 11C9 11.55 8.56 12 8 12ZM12 12C11.44 12 11 11.55 11 11C11 10.45 11.44 10 12 10C12.55 10 13 10.45 13 11C13 11.55 12.56 12 12 12ZM16 12C15.44 12 15 11.55 15 11C15 10.45 15.44 10 16 10C16.55 10 17 10.45 17 11C17 11.55 16.56 12 16 12Z" fill="#151B33"/>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="" v-if="orderstatus != 'Delivered'">
                            <div class="flex w-full items-center mt-2">
                                <span class="pr-[20px] font-poppins text-[12px] font-light text-[#4A4A4A]">Know Dispatcher's location </span>
                                <button type="button" class="pr-[10px]" @click="ViewRiderLoationNow()">
                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.1201 8.45C20.0701 3.83 16.0401 1.75 12.5001 1.75C12.5001 1.75 12.5001 1.75 12.4901 1.75C8.9601 1.75 4.9201 3.82 3.8701 8.44C2.7001 13.6 5.8601 17.97 8.7201 20.72C9.7801 21.74 11.1401 22.25 12.5001 22.25C13.8601 22.25 15.2201 21.74 16.2701 20.72C19.1301 17.97 22.2901 13.61 21.1201 8.45ZM12.5001 13.46C10.7601 13.46 9.3501 12.05 9.3501 10.31C9.3501 8.57 10.7601 7.16 12.5001 7.16C14.2401 7.16 15.6501 8.57 15.6501 10.31C15.6501 12.05 14.2401 13.46 12.5001 13.46Z" fill="#FF0000"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="bg-[#FFEBEB] rounded py-4 px-2 grid" v-if="orderstatus === 'pickedup'">
                    <div class="mb-3 flex w-full ">
                        <span class="w-[60%] font-poppins text-[#000000] text-[14px]" >Order Pickedup</span>
                        <span class="w-[40%] text-[#111111] text-[10px]">{{ $format_date(updated_at) }}</span>
                    </div>
                    <div class="text-[#111111] font-poppins text-[12px]">
                        📦 Your order has been paired with an agent! Preparing for pickup. 
                    </div>
                </div>
                <div class="bg-[#FFEBEB] rounded py-4 px-2 grid" v-if="orderstatus === 'delivered'">
                    <div class="mb-3 flex w-full ">
                        <span class="w-[60%] font-poppins text-[#000000] text-[14px]" >Order Delivered</span>
                        <span class="w-[40%] text-[#111111] text-[10px]">{{ $format_date(updated_at) }}</span>
                    </div>
                    <div class="text-[#111111] font-poppins text-[12px]">
                        📦 Your order has been paired with an agent! Preparing for pickup. 
                    </div>
                </div>
            </Accordion>
        </div>
        
        <div v-if="ShowFlashSuccess" class="fixed bottom-[74px] left-0 right-0 bg-[#01947a] font-poppins font-bold text-[12px] w-full h-[40px] p-2 flex justify-center text-white">{{ ShowFlashSuccess }}</div>
        <div v-if="ShowFlashError" class="fixed bottom-[74px] left-0 right-0 bg-[#f12222] font-poppins font-bold text-[12px] w-full h-[40px] p-2 flex justify-center text-white">{{ ShowMessage }}</div>
    </div>
    
</template>
<script setup>
 import { useRouter, useRoute } from 'vue-router'
import { useNavigation } from "@/composables/useNavigation";
import { ref, onMounted, defineEmits, defineProps  } from "vue";
import Accordion from '@/components/utils/Accordion.vue'
import axiosinstance from '@/auth';
import ConfirmPickupCode from '@/components/order/ConfirmPickupCode.vue';
import ReceiverDeliveryCode from '@/components/order/ReceiverDeliveryCode.vue';
import GoogleMap from '@/components/order/GoogleMap.vue';
import { ClockIcon, LinkIcon } from "@heroicons/vue/24/outline"

const { navigateTo } = useNavigation();
const router = useRouter();
const route = useRoute();
const props = defineProps({ MasterSlug: String });
const emit = defineEmits(["CloseIntrastate"]);
///////Close Modal
const closeModal = () => {
    emit('CloseIntrastate') 
}

const ShowFlashSuccess = ref(false);
const ShowFlashError = ref(false);
const loading = ref(false);
const created_at = ref("");const updated_at = ref("");const activity = ref(""); const orderNo = ref(""); const distance = ref(""); const time = ref(""); const itemCategory = ref(""); const deliverymethod = ref(""); const priderlink = ref(""); const driderlink = ref(""); const pAddress = ref(""); const pLocation = ref(""); const pName = ref(""); const pPhone = ref(""); const dAddress = ref(""); const dLocation = ref(""); const dName = ref(""); const dPhone = ref(""); const orderstatus = ref(""); const rider = ref(""); const riderName = ref(""); const riderPhone = ref(""); const riderAccount = ref(""); const ridervehModel = ref(""); const ridervehPlateno = ref("");const riderphoto = ref(""); const custToken = ref(""); const riderLatitude = ref(""); const riderLongitude = ref("");
const vendorname = ref(""); const vendorphone = ref("");const vendorlogo = ref("");

const getTrackDetails = async () => {
    try {
        loading.value = true
        const res = await axiosinstance.post('/vendor/dispatch/intrastate/order/trace',{
            orderno: props.MasterSlug,
            slug: route.params.slug
        });
       
        ///////////order
        created_at.value = res.data.lists.order.created_at
        updated_at.value = res.data.lists.order.updated_at
        activity.value = res.data.lists.order.activity
        orderNo.value = res.data.lists.order.order_no
        orderstatus.value = res.data.lists.order.order_status
        distance.value = res.data.lists.order.distance
        time.value = res.data.lists.order.time
        itemCategory.value = res.data.lists.order.order_type
        deliverymethod.value = res.data.lists.order.vehicle_type
        // priderlink.value = res.data.order.p_slug
        // driderlink.value = res.data.order.r_slug
        ///////////pickup
        pAddress.value = res.data.lists.pickup.address
        pLocation.value = res.data.lists.pickup.location
        pName.value = res.data.lists.pickup.name
        pPhone.value = res.data.lists.pickup.phone
        ///////////delivery
        dAddress.value = res.data.lists.deliver.address
        dLocation.value = res.data.lists.deliver.location
        dName.value = res.data.lists.deliver.name
        dPhone.value = res.data.lists.deliver.phone

        /////////////VENDOR
        vendorname.value =  res.data.vendor.company_name;
        vendorphone.value =  res.data.vendor.phone;
        vendorlogo.value =  res.data.vendor.logo;

        ////////////rider
        // rider.value = res.data.lists.rider
        riderName.value = res.data.lists.rider.ridername
        riderPhone.value = res.data.lists.rider.riderphone
        riderAccount.value = res.data.lists.rider.rideraccount
        riderphoto.value = res.data.lists.rider.photo
        ridervehModel.value = res.data.lists.rider.vehiclemodel
        ridervehPlateno.value = res.data.lists.rider.vehicleplateno
        // loading.value = false

        // custToken.value = res.data.rider.token

        

        // riderLatitude.value = res.data.riderloc.latitude
        // riderLongitude.value = res.data.riderloc.longitude
        
    } catch (error) {
        
    }finally{
        loading.value = false
    }
 

    
}
///////////////PICKUP CONFIRM
const IsConfirmPickup = ref(false);
const order_no = ref("");
const ConfirmPickup = () => {
    order_no.value  = orderNo.value
    IsConfirmPickup.value = true;
}

const closeConfirm = () => {
    IsConfirmPickup.value = false; 
    window.location.reload();
}
const SharePicuupLink = () => {
    var u= '/opendispatch/order/pickup/'+priderlink.value
    if (navigator.share) {
        navigator.share({
        title: 'Pickup Link',
        url: u,
        })
        .then(() => {
            ShowFlashSuccess.value = "Successfully shared the link";
            setTimeout(() => (ShowFlashSuccess.value = false), 3500);
        })
        .catch((error) => console.log('Error sharing:', error));
    } else {
        ShowFlashError.value = "Web Share API not supported in this browser";
        setTimeout(() => (ShowFlashError.value = false), 3500);
    }
}
/////////////////
const IsConfirmReceiver = ref(false);
const receivertoken = ref("");
const GenerateReceiverCode = () => {
    receivertoken.value = custToken.value
    IsConfirmReceiver.value = true
}
const handlecloseReceiver = () => {
    IsConfirmReceiver.value = false;
    window.location.reload();
  
}
const ShareReceiverCode = () => {
    var u = '/opendispatch/order/receiver/'+driderlink.value
    if (navigator.share) {
        navigator.share({
        title: 'Receivers Link',
        url: u,
        })
        .then(() => {
            ShowFlashSuccess.value = "Successfully shared the link";
            setTimeout(() => (ShowFlashSuccess.value = false), 3500);
        })
        .catch((error) => console.log('Error sharing:', error));
    } else {
        ShowFlashError.value = "Web Share API not supported in this browser";
        setTimeout(() => (ShowFlashError.value = false), 3500);
    }
}
/////////////
const isGoogleMap = ref(false);
const Latitude = ref(""); const Longitude = ref("");
const ViewRiderLoationNow = () => {
    riderLatitude.value = Latitude.value
    riderLongitude.value = Longitude.value
    isGoogleMap.value = true
}

onMounted(() => {
    getTrackDetails();
});

 
</script>
<style>
#map {
  height: 100%;
}
 
#floating-panel {
  position: absolute;
  top: 10px;
  left: 25%;
  z-index: 5;
  background-color: #fff;
  padding: 5px;
  border: 1px solid #999;
  text-align: center;
  font-family: "Roboto", "sans-serif";
  line-height: 30px;
  padding-left: 10px;
}

</style>