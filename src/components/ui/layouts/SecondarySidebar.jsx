// components/ui/layouts/SecondarySidebar.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Folder,
  FolderOpen,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Plus,
  MoreHorizontal,
  Trash2,
  Edit,
  Copy,
  Archive,
  Search,
  FolderTree,
  Image as ImageIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useFolders } from '@/context/FolderContext';

const SecondarySidebar = ({ isOpen, onToggle, activeMenu }) => {
  const router = useRouter();
  const { folders, setFolders, selectedFolder, setSelectedFolder } = useFolders();

  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false);
  const [showFolderImageDialog, setShowFolderImageDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [folderImage, setFolderImage] = useState(null);
  const [folderImagePreview, setFolderImagePreview] = useState(null);
  const [contextMenuFolder, setContextMenuFolder] = useState(null);
  const [selectedFolderForImage, setSelectedFolderForImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Only show content for Items menu for now
  if (activeMenu !== 'Items') {
    return (
      <aside className={cn(
        "relative h-screen bg-white/80 backdrop-blur-sm border-r border-gray-200/50 transition-all duration-300",
        isOpen ? "w-80" : "w-20"
      )}>
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200/50">
          <span className="font-medium text-sm capitalize text-gray-600">
            {activeMenu}
          </span>
          <Button variant="ghost" size="icon" onClick={onToggle} className="hover:bg-gray-100/50">
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </Button>
        </div>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)] text-gray-400 text-sm px-4 text-center">
          <div className="space-y-2">
            <FolderTree size={32} className="mx-auto opacity-50" />
            <p>Coming soon...</p>
          </div>
        </div>
      </aside>
    );
  }

  const toggleFolder = (folderId, e) => {
    e.stopPropagation();
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  };

  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
    const event = new CustomEvent('folderSelect', { detail: folder });
    window.dispatchEvent(event);
    router.push('/dashboard/items');
  };

  const handleFolderImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFolderImage(reader.result);
        setFolderImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addFolder = (parentId = null) => {
    if (!newFolderName.trim()) return;

    const newFolder = {
      id: Date.now().toString(),
      name: newFolderName,
      type: 'folder',
      parentId,
      image: folderImage || null,
      children: [],
      createdAt: new Date().toISOString(),
    };

    if (parentId === null) {
      setFolders(prev => [...prev, newFolder]);
    } else {
      const updateFolders = (items) => items.map(item => {
        if (item.id === parentId) {
          return {
            ...item,
            children: [...(item.children || []), newFolder]
          };
        }
        if (item.children) {
          return {
            ...item,
            children: updateFolders(item.children)
          };
        }
        return item;
      });
      setFolders(updateFolders(folders));
      setExpandedFolders(prev => new Set([...prev, parentId]));
    }

    setNewFolderName('');
    setFolderImage(null);
    setFolderImagePreview(null);
    setShowNewFolderDialog(false);
    setContextMenuFolder(null);
  };

  const updateFolderImage = () => {
    if (!selectedFolderForImage || !folderImage) return;

    const update = (items) => items.map(item => {
      if (item.id === selectedFolderForImage.id) {
        return { ...item, image: folderImage };
      }
      if (item.children) {
        return { ...item, children: update(item.children) };
      }
      return item;
    });

    setFolders(update(folders));

    setShowFolderImageDialog(false);
    setSelectedFolderForImage(null);
    setFolderImage(null);
    setFolderImagePreview(null);
  };

  const deleteFolder = (folderId, e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this folder and all its contents?')) {
      const removeFolder = (items) => {
        return items.filter(item => {
          if (item.id === folderId) return false;
          if (item.children) {
            item.children = removeFolder(item.children);
          }
          return true;
        });
      };
      setFolders(removeFolder(folders));

      if (selectedFolder?.id === folderId) {
        setSelectedFolder(null);
      }
    }
  };

  const renameFolder = (folderId, currentName, e) => {
    e.stopPropagation();
    const newName = prompt('Enter new folder name:', currentName);
    if (newName && newName.trim()) {
      const updateName = (items) => items.map(item => {
        if (item.id === folderId) {
          return { ...item, name: newName };
        }
        if (item.children) {
          return { ...item, children: updateName(item.children) };
        }
        return item;
      });
      setFolders(updateName(folders));
    }
  };

  const filterFolders = (items, query) => {
    if (!query) return items;

    return items.reduce((acc, item) => {
      if (item.name.toLowerCase().includes(query.toLowerCase())) {
        acc.push(item);
      } else if (item.children) {
        const filteredChildren = filterFolders(item.children, query);
        if (filteredChildren.length > 0) {
          acc.push({ ...item, children: filteredChildren });
        }
      }
      return acc;
    }, []);
  };

  const renderFolderTree = (items, level = 0) => {
    return items.map(item => (
      <div key={item.id}>
        <div
          className={cn(
            "flex items-center gap-1 px-2 py-2 rounded-lg cursor-pointer group transition-all duration-200",
            selectedFolder?.id === item.id
              ? "bg-emerald-50 text-emerald-700 shadow-sm"
              : "hover:bg-gray-100/80 hover:shadow-sm",
            level > 0 && "ml-4"
          )}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => handleFolderClick(item)}
        >
          <button
            onClick={(e) => toggleFolder(item.id, e)}
            className="p-0.5 hover:bg-gray-200 rounded transition-colors"
          >
            {item.children && item.children.length > 0 ? (
              expandedFolders.has(item.id) ? (
                <ChevronDown size={16} className="text-gray-500" />
              ) : (
                <ChevronRight size={16} className="text-gray-500" />
              )
            ) : (
              <span className="w-4" />
            )}
          </button>

          <div className="flex items-center flex-1 gap-2">
            <div className="w-5 h-5 rounded overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
              {item.image ? (
                <img src={item.image} alt="" className="w-full h-full object-cover" />
              ) : (
                expandedFolders.has(item.id) ? (
                  <FolderOpen size={14} className="text-amber-500" />
                ) : (
                  <Folder size={14} className="text-amber-500" />
                )
              )}
            </div>
            <span className="text-sm font-medium text-gray-700 flex-1 truncate">{item.name}</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:bg-gray-200">
                <MoreHorizontal size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem onClick={(e) => {
                e.stopPropagation();
                setContextMenuFolder(item);
                setShowNewFolderDialog(true);
              }}>
                <Plus className="mr-2 h-4 w-4" /> New Subfolder
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => {
                e.stopPropagation();
                setSelectedFolderForImage(item);
                setShowFolderImageDialog(true);
              }}>
                <ImageIcon className="mr-2 h-4 w-4" /> Change Image
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => renameFolder(item.id, item.name, e)}>
                <Edit className="mr-2 h-4 w-4" /> Rename
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => deleteFolder(item.id, e)}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <Copy className="mr-2 h-4 w-4" /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <Archive className="mr-2 h-4 w-4" /> Archive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {expandedFolders.has(item.id) && item.children && item.children.length > 0 && (
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200/50" />
            {renderFolderTree(item.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  const filteredFolders = searchQuery ? filterFolders(folders, searchQuery) : folders;

  if (!isOpen) {
    return (
      <aside className="relative h-screen bg-white/80 backdrop-blur-sm border-r border-gray-200/50 transition-all duration-300 w-20">
        <div className="flex h-16 items-center justify-center border-b border-gray-200/50">
          <Button variant="ghost" size="icon" onClick={onToggle} className="hover:bg-gray-100/50">
            <ChevronRight size={20} className="text-gray-600" />
          </Button>
        </div>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <Folder size={24} className="text-amber-400" />
        </div>
      </aside>
    );
  }

  return (
    <aside className="relative h-screen bg-white/80 backdrop-blur-sm border-r border-gray-200/50 transition-all duration-300 w-60 flex flex-col">
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200/50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-50 rounded-lg">
            <FolderTree size={18} className="text-amber-500" />
          </div>
          <span className="font-semibold text-gray-700">Folders</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onToggle} className="hover:bg-gray-100/50">
          <ChevronLeft size={20} className="text-gray-600" />
        </Button>
      </div>

      <div className="p-3 border-b border-gray-200/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 bg-white/50 border-gray-200/50 focus:bg-white transition-all"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setContextMenuFolder(null);
              setShowNewFolderDialog(true);
            }}
            className="w-full justify-start gap-2 mb-2 text-gray-600 hover:bg-amber-50 hover:text-amber-600"
          >
            <Plus size={16} />
            New Folder
          </Button>

          {filteredFolders.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="p-3 bg-amber-50 rounded-full w-fit mx-auto mb-3">
                <Folder size={32} className="text-amber-400" />
              </div>
              <p className="text-sm font-medium text-gray-500">No folders found</p>
              <Button
                variant="link"
                className="mt-1 text-amber-600"
                onClick={() => {
                  setContextMenuFolder(null);
                  setShowNewFolderDialog(true);
                }}
              >
                Create your first folder
              </Button>
            </div>
          ) : (
            renderFolderTree(filteredFolders)
          )}
        </div>
      </ScrollArea>

      {/* New Folder Dialog */}
      <Dialog open={showNewFolderDialog} onOpenChange={setShowNewFolderDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <Label htmlFor="folderName">Folder Name</Label>
              <Input
                id="folderName"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Enter folder name"
                className="mt-2"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addFolder(contextMenuFolder?.id);
                  }
                }}
              />
            </div>

            <div>
              <Label>Folder Image (Optional)</Label>
              <div className="mt-2 flex items-center gap-4">
                {folderImagePreview ? (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                    <img
                      src={folderImagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 bg-black/50 hover:bg-black/70 text-white"
                      onClick={() => {
                        setFolderImage(null);
                        setFolderImagePreview(null);
                      }}
                    >
                      <Trash2 size={12} />
                    </Button>
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-lg bg-amber-50 border-2 border-dashed border-amber-200 flex flex-col items-center justify-center text-amber-400">
                    <ImageIcon size={24} />
                    <span className="text-xs mt-1">No image</span>
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFolderImageUpload}
                    className="bg-white/50 border-gray-200/50"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended: Square image, max 2MB
                  </p>
                </div>
              </div>
            </div>

            {contextMenuFolder && (
              <p className="text-xs text-gray-500 flex items-center gap-1">
                {contextMenuFolder.image ? (
                  <div className="w-4 h-4 rounded overflow-hidden">
                    <img src={contextMenuFolder.image} alt="" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <Folder size={12} className="text-amber-500" />
                )}
                Creating in: {contextMenuFolder.name}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowNewFolderDialog(false);
              setNewFolderName('');
              setFolderImage(null);
              setFolderImagePreview(null);
              setContextMenuFolder(null);
            }}>
              Cancel
            </Button>
            <Button onClick={() => addFolder(contextMenuFolder?.id)} className="bg-amber-500 hover:bg-amber-600">
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Folder Image Dialog */}
      <Dialog open={showFolderImageDialog} onOpenChange={setShowFolderImageDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Folder Image</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedFolderForImage && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-amber-100 flex items-center justify-center">
                    {selectedFolderForImage.image ? (
                      <img src={selectedFolderForImage.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Folder size={24} className="text-amber-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{selectedFolderForImage.name}</p>
                    <p className="text-xs text-gray-500">Current image</p>
                  </div>
                </div>

                <div>
                  <Label>Upload New Image</Label>
                  <div className="mt-2 flex items-center gap-4">
                    {folderImagePreview ? (
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                        <img
                          src={folderImagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-lg bg-amber-50 border-2 border-dashed border-amber-200 flex items-center justify-center text-amber-400">
                        <ImageIcon size={24} />
                      </div>
                    )}
                    <div className="flex-1">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFolderImageUpload}
                        className="bg-white/50 border-gray-200/50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowFolderImageDialog(false);
              setSelectedFolderForImage(null);
              setFolderImage(null);
              setFolderImagePreview(null);
            }}>
              Cancel
            </Button>
            <Button
              onClick={updateFolderImage}
              className="bg-amber-500 hover:bg-amber-600"
              disabled={!folderImage}
            >
              Update Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </aside>
  );
};

export default SecondarySidebar;