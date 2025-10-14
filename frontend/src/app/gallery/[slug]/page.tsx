import { UnderConstructionPage } from '@/components/common/UnderConstructionPage';
import { ROUTES } from '@/constants';

interface AlbumDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AlbumDetailPage({
  params,
}: AlbumDetailPageProps) {
  const { slug: _slug } = await params;

  const breadcrumbItems = [
    { label: 'Beranda', href: ROUTES.HOME },
    { label: 'Galeri', href: ROUTES.GALLERY.ROOT },
    { label: 'Detail Album', current: true },
  ];

  return (
    <UnderConstructionPage
      title="Detail Album"
      breadcrumbs={breadcrumbItems}
      estimatedCompletion="Maret 2026"
    />
  );
}

// TEMPORARILY DISABLED - UNDER CONSTRUCTION
// import { Metadata } from 'next';
// import { notFound } from 'next/navigation';
// import {
//   Breadcrumb,
//   BreadcrumbList,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from '@/components/ui/breadcrumb';
// import { Button } from '@/components/ui/button';
// import { ArrowLeft } from 'lucide-react';
// import Link from 'next/link';
// import { ROUTES, APP_CONFIG } from '@/constants';
// import { MOCK_MEDIA_ALBUMS, MOCK_MEDIA_ITEMS } from '@/constants/content';
// import {
//   AlbumHeader,
//   MediaGrid,
//   RelatedAlbums,
// } from '@/components/features/gallery';

// interface AlbumDetailPageProps {
//   params: Promise<{
//     slug: string;
//   }>;
// }

// export async function generateMetadata({
//   params,
// }: AlbumDetailPageProps): Promise<Metadata> {
//   // In real implementation, this would fetch from API
//   const { slug } = await params;
//   const album = MOCK_MEDIA_ALBUMS.find((a) => a.slug === slug);

//   if (!album) {
//     return {
//       title: 'Album Tidak Ditemukan',
//     };
//   }

//   return {
//     title: `${album.title} | Galeri | ${APP_CONFIG.name}`,
//     description: album.description,
//     openGraph: {
//       title: album.title,
//       description: album.description,
//       type: 'article',
//       images: album.coverImage ? [album.coverImage] : undefined,
//     },
//   };
// }

// export default async function AlbumDetailPage({
//   params,
// }: AlbumDetailPageProps) {
//   // In real implementation, this would fetch from API
//   const { slug } = await params;
//   const album = MOCK_MEDIA_ALBUMS.find((a) => a.slug === slug);

//   if (!album) {
//     notFound();
//   }

//   // Filter media items for this album
//   const albumItems = MOCK_MEDIA_ITEMS.filter(
//     (item) => item.albumId === album.id
//   );
//   const photoCount = albumItems.filter((item) => item.type === 'image').length;
//   const videoCount = albumItems.filter((item) => item.type === 'video').length;

//   const breadcrumbItems = [
//     { label: 'Beranda', href: ROUTES.HOME },
//     { label: 'Galeri', href: ROUTES.GALLERY.ROOT },
//     { label: album.title, href: ROUTES.GALLERY.ALBUM(album.slug) },
//   ];

//   const relatedAlbums = MOCK_MEDIA_ALBUMS.filter(
//     (a) => a.id !== album.id
//   ).slice(0, 3);

//   return (
//     <div className="bg-background min-h-screen">
//       {/* Breadcrumb */}
//       <div className="bg-muted/30 border-b">
//         <div className="container mx-auto px-4 py-4">
//           <Breadcrumb>
//             <BreadcrumbList>
//               {breadcrumbItems.map((item, index) => (
//                 <div key={index} className="flex items-center">
//                   <BreadcrumbItem>
//                     {index < breadcrumbItems.length - 1 ? (
//                       <BreadcrumbLink asChild>
//                         <Link href={item.href}>{item.label}</Link>
//                       </BreadcrumbLink>
//                     ) : (
//                       <BreadcrumbPage className="line-clamp-1">
//                         {item.label}
//                       </BreadcrumbPage>
//                     )}
//                   </BreadcrumbItem>
//                   {index < breadcrumbItems.length - 1 && (
//                     <BreadcrumbSeparator />
//                   )}
//                 </div>
//               ))}
//             </BreadcrumbList>
//           </Breadcrumb>
//         </div>
//       </div>

//       {/* Back Button */}
//       <div className="container mx-auto px-4 py-4">
//         <Button variant="ghost" asChild className="mb-4">
//           <Link href={ROUTES.GALLERY.ROOT}>
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Kembali ke Galeri
//           </Link>
//         </Button>
//       </div>

//       {/* Album Header */}
//       <AlbumHeader
//         album={album}
//         photoCount={photoCount}
//         videoCount={videoCount}
//       />

//       {/* Media Grid */}
//       <MediaGrid items={albumItems} />

//       {/* Related Albums */}
//       <RelatedAlbums albums={relatedAlbums} />
//     </div>
//   );
// }
