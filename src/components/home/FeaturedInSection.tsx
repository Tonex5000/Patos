import Marquee from 'react-fast-marquee';

const itemList = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4];


const FeaturedInSection = () => {
    return (
        <div className="w-full p-[10px] max-md:p-2 max-md:box-border max-md:w-full max-md:max-w-full flex flex-col gap-5">
            <div className="flex items-center justify-center w-full max-md:px-2">
                <span className="text-[30px] max-md:text-xl font-bold" style={{ fontFamily: 'ArchivoBlack' }}>Featured in</span>
            </div>
            <div className="py-5 w-full max-md:overflow-x-hidden bg-gray-300">
                <Marquee className="w-full h-[69px] flex items-center gap-4 max-md:gap-2" speed={80}>
                    {
                        itemList && itemList.map((item, index) => (
                                <div className='flex items-center justify-center h-full px-10' key={index}>
                                    <img src={`/img/home/featureIn/${item}.png`} alt="feature" className="max-h-[69px]" />
                                </div>
                        ))
                    }
                </Marquee>
            </div>
        </div>
    );
}

export default FeaturedInSection;