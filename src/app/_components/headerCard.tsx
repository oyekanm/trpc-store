import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

type Props = {
    text: string;
    clickFunction?: () => void;
    btnTitle: string;
    href: string
}

function HeaderCard({ text, btnTitle, clickFunction, href }: Props) {
    return (
        <div className='flex items-center justify-between p-4 shadow-[2px_4px_10px_1px_rgba(201,201,201,0.47)] rounded-[.5rem]'>
            <p className='text-[2rem] color-primary capitalize '>{text}</p>
            <Link href={href}>
                <Button
                    variant="outline"
                    size="lg"
                    className="text-[1.5rem] "
                >
                    {btnTitle}
                </Button>
            </Link>
        </div>
    )
}

export default HeaderCard