import React, { useState, useEffect } from 'react';
import { Plus, Disc } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface VinylRecord {
  id: string;
  artist: string;
  album: string;
  label: string;
  year: number;
  image_url: string;
}

export default function Dashboard() {
  const [records, setRecords] = useState<VinylRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    artist: '',
    album: '',
    label: '',
    year: new Date().getFullYear(),
    image_url: ''
  });
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, []);

  async function fetchRecords() {
    setLoading(true);
    const { data, error } = await supabase
      .from('vinyl_records')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Error fetching records');
    } else {
      setRecords(data || []);
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from('vinyl_records').insert([{
      ...formData,
      user_id: session?.user?.id
    }]);

    if (error) {
      toast.error('Error saving record');
      console.error('Error:', error);
    } else {
      toast.success('Record added successfully');
      setFormData({ artist: '', album: '', label: '', year: new Date().getFullYear(),image_url: '', });
      setShowForm(false);
      fetchRecords();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">My Vinyl Collection</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Record
        </button>
      </div>

      {showForm && (
        <div className="bg-white shadow sm:rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="artist" className="block text-sm font-medium text-gray-700">
                  Artist
                </label>
                <input
                  type="text"
                  id="artist"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  value={formData.artist}
                  onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="album" className="block text-sm font-medium text-gray-700">
                  Album
                </label>
                <input
                  type="text"
                  id="album"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  value={formData.album}
                  onChange={(e) => setFormData({ ...formData, album: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="label" className="block text-sm font-medium text-gray-700">
                  Label
                </label>
                <input
                  type="text"
                  id="label"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                  Year
                </label>
                <input
                  type="number"
                  id="year"
                  required
                  min="1900"
                  max={new Date().getFullYear()}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                />
              </div>
              <div>

  <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
                Image URL
                </label>
                <input
                  type="text"
                  id="image_url"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                   value={formData.image_url}
                   onChange={(e) => setFormData({...formData, image_url: e.target.value })}
                   />



              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Save Record
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white overflow-hidden shadow rounded-lg p-5">
                <Skeleton height={192} className="mb-4" />
                <div className="flex items-center">
                  <Skeleton circle={true} height={32} width={32} />
                  <div className="ml-4">
                    <Skeleton height={20} width={150} />
                    <Skeleton height={16} width={100} />
                  </div>
                </div>
                <div className="mt-4">
                  <Skeleton height={16} width={80} />
                  <Skeleton height={16} width={50} />
                </div>
              </div>
            ))}
          </>
        ) : (
          records.map((record) => (
            <div key={record.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <img src={record.image_url} alt={`Imagen de ${record.album}`} className="w-full h-48 object-cover mb-4" />
                <div className="flex items-center">
                  <Disc className="h-8 w-8 text-indigo-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{record.album}</h3>
                    <p className="text-sm text-gray-500">{record.artist}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-sm text-gray-500">
                    <p>Label: {record.label}</p>
                    <p>Year: {record.year}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}