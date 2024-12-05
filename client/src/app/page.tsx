import Image from 'next/image'
import Link from 'next/link';
// import image1 from "../../public/images/image1.jpg"

export default function Home() {
  return (
    <div className="w-[700px] h-[700px] bg-red-300">
      <Link href="/login">login</Link>
      <Image
        // src={image1}
        src='https://images.pexels.com/photos/14747089/pexels-photo-14747089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        alt='image1'
        sizes="100vw"

        style={{
          width: '100%',
          height: 'auto',
        }}
        width={500}
        height={500}
        quality={100}
      />
    </div>
  );
}
