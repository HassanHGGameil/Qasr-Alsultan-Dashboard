

import BranchesClient from '@/components/StoreActionUi/Branches/Branch/BranchClinet'
import BranchesHeroClient from '@/components/StoreActionUi/Branches/BranchesHero/BranchesHeroClient'
import React from 'react'

const Branches = () => {
  return (
    <main>
       <BranchesHeroClient />
       <BranchesClient />
    </main>
  )
}

export default Branches