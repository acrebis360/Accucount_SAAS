// context/FolderContext.jsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const FolderContext = createContext();

export function FolderProvider({ children }) {
  const [folders, setFolders] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);

  // Load from localStorage once
  useEffect(() => {
    const savedFolders = localStorage.getItem('folders');
    const savedItems   = localStorage.getItem('items');

    if (savedFolders) {
      setFolders(JSON.parse(savedFolders));
    } else {
      const initialFolders = [
        {
          id: '1', name: 'Electronics', type: 'folder', parentId: null, image: null, children: [
            { id: '2', name: 'Laptops', type: 'folder', parentId: '1', image: null, children: [
              { id: '3', name: 'Gaming Laptops', type: 'folder', parentId: '2', image: null, children: [] },
              { id: '4', name: 'Business Laptops', type: 'folder', parentId: '2', image: null, children: [] }
            ]},
            { id: '5', name: 'Smartphones', type: 'folder', parentId: '1', image: null, children: [
              { id: '6', name: 'iPhone',     type: 'folder', parentId: '5', image: null, children: [] },
              { id: '7', name: 'Android',    type: 'folder', parentId: '5', image: null, children: [] }
            ]}
          ]
        },
        {
          id: '8', name: 'Clothing', type: 'folder', parentId: null, image: null, children: [
            { id: '9', name: 'Men', type: 'folder', parentId: '8', image: null, children: [
              { id: '10', name: 'Shirts', type: 'folder', parentId: '9', image: null, children: [] },
              { id: '11', name: 'Pants',  type: 'folder', parentId: '9', image: null, children: [] }
            ]},
            { id: '12', name: 'Women', type: 'folder', parentId: '8', image: null, children: [
              { id: '13', name: 'Dresses',     type: 'folder', parentId: '12', image: null, children: [] },
              { id: '14', name: 'Accessories', type: 'folder', parentId: '12', image: null, children: [] }
            ]}
          ]
        }
      ];
      setFolders(initialFolders);
      localStorage.setItem('folders', JSON.stringify(initialFolders));
    }

    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      const sampleItems = [
        { id: '101', name: 'MacBook Pro',     type: 'item', folderId: '3', createdAt: new Date().toISOString(), size: '2.5 MB', modified: new Date().toLocaleDateString() },
        { id: '102', name: 'Dell XPS',        type: 'item', folderId: '4', createdAt: new Date().toISOString(), size: '1.8 MB', modified: new Date().toLocaleDateString() },
        { id: '103', name: 'iPhone 15',       type: 'item', folderId: '6', createdAt: new Date().toISOString(), size: '3.2 MB', modified: new Date().toLocaleDateString() },
        { id: '104', name: 'Samsung S24',     type: 'item', folderId: '7', createdAt: new Date().toISOString(), size: '2.1 MB', modified: new Date().toLocaleDateString() },
        { id: '105', name: 'Nike Air Max',    type: 'item', folderId: '10',createdAt: new Date().toISOString(), size: '1.2 MB', modified: new Date().toLocaleDateString() },
        { id: '106', name: 'Levis Jeans',     type: 'item', folderId: '11',createdAt: new Date().toISOString(), size: '1.5 MB', modified: new Date().toLocaleDateString() },
      ];
      setItems(sampleItems);
      localStorage.setItem('items', JSON.stringify(sampleItems));
    }
  }, []);

  // Save whenever folders or items change
  useEffect(() => {
    if (folders.length > 0) localStorage.setItem('folders', JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    if (items.length > 0) localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const value = {
    folders,
    setFolders,
    items,
    setItems,
    selectedFolder,
    setSelectedFolder,
  };

  return (
    <FolderContext.Provider value={value}>
      {children}
    </FolderContext.Provider>
  );
}

export const useFolders = () => useContext(FolderContext);