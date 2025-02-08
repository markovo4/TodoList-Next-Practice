import {RedirectButton} from "@/components/common/buttons/RedirectButton";

export default function Home() {
  return (
      <div>
        <p className='text-center'>Dashboard</p>
        <RedirectButton path={'/auth/two-factor/subscribe'} title={'Setup 2-Fa'}/>
      </div>

  );
}
