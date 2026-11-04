import type { StructureBuilder, StructureResolver } from 'sanity/structure'
import type { ComponentType } from 'react'
import { CogIcon } from '@sanity/icons/Cog'
import { CommentIcon } from '@sanity/icons/Comment'
import { DocumentIcon } from '@sanity/icons/Document'
import { EditIcon } from '@sanity/icons/Edit'
import { FolderIcon } from '@sanity/icons/Folder'
import { HelpCircleIcon } from '@sanity/icons/HelpCircle'
import { HomeIcon } from '@sanity/icons/Home'
import { MenuIcon } from '@sanity/icons/Menu'
import { PackageIcon } from '@sanity/icons/Package'
import { PinIcon } from '@sanity/icons/Pin'
import { TransferIcon } from '@sanity/icons/Transfer'
import { UserIcon } from '@sanity/icons/User'

/** Singleton: clicking the item opens the one document directly (no list). */
function singletonListItem(S: StructureBuilder, typeName: string, title: string, icon: ComponentType) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .id(typeName)
    .child(S.document().schemaType(typeName).documentId(typeName).title(title))
}

function documentListItem(S: StructureBuilder, typeName: string, title: string, icon: ComponentType) {
  return S.documentTypeListItem(typeName).title(title).icon(icon)
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      singletonListItem(S, 'homePage', 'Home page', HomeIcon),
      documentListItem(S, 'page', 'Pages', DocumentIcon),
      S.divider(),
      documentListItem(S, 'category', 'Program hubs', FolderIcon),
      S.listItem()
        .title('Services')
        .icon(PackageIcon)
        .child(
          S.list()
            .title('Services')
            .items([
              S.listItem()
                .title('All services')
                .icon(PackageIcon)
                .child(S.documentTypeList('service').title('All services')),
              S.listItem()
                .title('By program hub')
                .icon(FolderIcon)
                .child(
                  S.documentTypeList('category')
                    .title('Program hubs')
                    .child((categoryId) =>
                      S.documentList()
                        .title('Services')
                        .schemaType('service')
                        .filter('_type == "service" && category._ref == $categoryId')
                        .params({ categoryId })
                        .initialValueTemplates([S.initialValueTemplateItem('service-in-category', { categoryId })]),
                    ),
                ),
              S.listItem()
                .title('Home-level services')
                .icon(HomeIcon)
                .child(S.documentList().title('Home-level services').schemaType('service').filter('_type == "service" && !defined(category)')),
              S.listItem()
                .title('Waiting for confirmation')
                .icon(HelpCircleIcon)
                .child(S.documentList().title('Waiting for confirmation').schemaType('service').filter('_type == "service" && needsConfirmation == true')),
            ]),
        ),
      documentListItem(S, 'serviceArea', 'City pages', PinIcon),
      documentListItem(S, 'blogPost', 'Blog posts', EditIcon),
      S.divider(),
      documentListItem(S, 'testimonial', 'Google reviews', CommentIcon),
      documentListItem(S, 'faq', 'FAQs', HelpCircleIcon),
      documentListItem(S, 'teamMember', 'Team', UserIcon),
      S.divider(),
      singletonListItem(S, 'navigation', 'Navigation', MenuIcon),
      singletonListItem(S, 'siteSettings', 'Site settings', CogIcon),
      documentListItem(S, 'redirect', 'Redirects', TransferIcon),
    ])
