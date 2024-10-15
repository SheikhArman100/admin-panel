"use client"
import Image from 'next/image'
import React, { useState } from 'react'

type IIMageProps = {
  image: {
    diskType: string
    path: string
    originalName: string
    modifiedName: string
  }
  className?: string
  height: number
  width: number
}

const ProfileImage: React.FC<IIMageProps> = ({
  image,
  className,
  height,
  width
}) => {
  const [profileImage, setProfileImage] = useState(`${process.env.NEXT_PUBLIC_IMAGE_URL}/${image?.path}`)
  return (
    <Image
      src={profileImage}
      alt={image?.originalName}
      width={width}
      height={height}
      className={className}
      onError={()=>setProfileImage("/media/blank.png")}
    />
  )
}

export default ProfileImage
